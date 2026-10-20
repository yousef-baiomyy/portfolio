import { useEffect, useRef, useState } from 'react';

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_highlight;

#define CHAR_SIZE 16.0

vec3 charSet[6];

float rand(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float getChar(vec2 pos, float time) {
  charSet[0] = vec3(48.0, 0.0, 0.0);  // "0"
  charSet[1] = vec3(49.0, 0.0, 0.0);  // "1"
  charSet[2] = vec3(65.0, 0.0, 0.0);  // "A"
  charSet[3] = vec3(66.0, 0.0, 0.0);  // "B"
  charSet[4] = vec3(67.0, 0.0, 0.0);  // "C"
  charSet[5] = vec3(68.0, 0.0, 0.0);  // "D"

  float idx = mod(floor(rand(pos) * 6.0), 6.0);
  float changeRate = step(0.98, rand(pos + mod(time, 100.0)));

  if (changeRate > 0.5) {
    idx = mod(floor(rand(pos + 1.0) * 6.0), 6.0);
  }

  return idx;
}

void main() {
  vec2 pixel = gl_FragCoord.xy;
  vec2 grid = floor(pixel / CHAR_SIZE);
  float charIndex = getChar(grid, u_time);

  vec3 baseColor = vec3(0.02, 0.02, 0.02);
  vec3 activeColor = vec3(0.0, 0.941, 1.0);

  float wave = sin(grid.y * 0.1 - u_time * 1.5 + grid.x * 0.05) * 0.5 + 0.5;
  float columnActive = smoothstep(0.4, 0.6, sin(grid.x * 0.3 + u_time * 0.5));
  float columnBright = columnActive * wave;

  float highlight = u_highlight;
  if (u_mouse.x > 0.0) {
    vec2 m = u_mouse;
    vec2 diff = abs(grid - m);
    float dist = length(diff);
    float falloff = exp(-dist * 0.15);
    highlight += falloff * 2.5;
  }

  vec3 finalColor = mix(baseColor, activeColor, columnBright * 0.4 * highlight);
  float inChar = step(0.2, rand(grid * 0.1 + floor(pixel / (CHAR_SIZE * 0.2))));

  gl_FragColor = vec4(finalColor * inChar, 1.0);
}
`;

interface GridCanvasProps {
  className?: string;
}

/*
 * Browsers allow only ~16 live WebGL contexts per page. Every project and
 * skill card has one of these grids, so we only create a context while the
 * card is on (or near) the screen and release it as soon as it scrolls away.
 * This keeps the page at a handful of contexts no matter how many cards exist,
 * so the 3D background is never killed by the browser.
 */
export default function GridCanvas({ className }: GridCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  useEffect(() => {
    if (isMobile) return;
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '120px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isMobile]);

  if (isMobile) {
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(0,240,255,0.03) 0%, transparent 70%)',
        }}
      />
    );
  }

  return (
    <div ref={wrapRef} className={className} style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
      {active && <GridGL />}
    </div>
  );
}

function GridGL() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    function compileShader(src: string, type: number) {
      const shader = gl!.createShader(type)!;
      gl!.shaderSource(shader, src);
      gl!.compileShader(shader);
      return shader;
    }

    const vs = compileShader(VERTEX_SHADER, gl.VERTEX_SHADER);
    const fs = compileShader(FRAGMENT_SHADER, gl.FRAGMENT_SHADER);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const highlightLoc = gl.getUniformLocation(program, 'u_highlight');

    let mouseX = -1;
    let mouseY = -1;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      canvas!.width = Math.max(1, Math.floor(rect.width));
      canvas!.height = Math.max(1, Math.floor(rect.height));
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(resolutionLoc, canvas!.width, canvas!.height);
    }

    let animId = 0;
    function render(time: number) {
      animId = requestAnimationFrame(render);
      if (gl!.isContextLost()) return;
      time *= 0.001;
      gl!.uniform1f(timeLoc, time);
      gl!.uniform1f(highlightLoc, 0.6);
      if (mouseX >= 0) {
        gl!.uniform2f(mouseLoc, mouseX, canvas!.height - mouseY);
      }
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function onMouseLeave() {
      mouseX = -1;
      mouseY = -1;
    }

    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    resize();
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      // Give the context back to the browser right away
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'block' }}
    />
  );
}
