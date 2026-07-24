/**
 * Shader Lines Animation using Three.js WebGL
 * Implements the exact GLSL fragment shader provided.
 */

(function () {
  let camera, scene, renderer, uniforms, animationId;
  const containerId = 'shader-canvas-container';

  function initShaderAnimation() {
    const container = document.getElementById(containerId);
    if (!container || !window.THREE) return;

    // Clear previous content if any
    container.innerHTML = '';

    const THREE = window.THREE;

    // Initialize camera
    camera = new THREE.Camera();
    camera.position.z = 1;

    // Initialize scene
    scene = new THREE.Scene();

    // Create geometry
    const geometry = new THREE.PlaneBufferGeometry
      ? new THREE.PlaneBufferGeometry(2, 2)
      : new THREE.PlaneGeometry(2, 2);

    // Uniforms
    uniforms = {
      time: { type: 'f', value: 1.0 },
      resolution: { type: 'v2', value: new THREE.Vector2() }
    };

    // Vertex Shader
    const vertexShader = `
      void main() {
        gl_Position = vec4( position, 1.0 );
      }
    `;

    // Fragment Shader
    const fragmentShader = `
      #define TWO_PI 6.2831853072
      #define PI 3.14159265359

      precision highp float;
      uniform vec2 resolution;
      uniform float time;
        
      float random (in float x) {
          return fract(sin(x)*1e4);
      }
      float random (vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
      }
      
      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        vec2 fMosaicScal = vec2(4.0, 2.0);
        vec2 vScreenSize = vec2(256,256);
        uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
        uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);       
          
        float t = time * 0.06 + random(uv.x) * 0.4;
        float lineWidth = 0.0008;

        vec3 color = vec3(0.0);
        for(int j = 0; j < 3; j++){
          for(int i = 0; i < 5; i++){
            color[j] += lineWidth * float(i * i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 1.0 - length(uv));        
          }
        }

        gl_FragColor = vec4(color[2], color[1], color[0], 1.0);
      }
    `;

    // Create material
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader
    });

    // Create mesh & add to scene
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Initialize renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Resize handler
    function onWindowResize() {
      if (!container || !renderer) return;
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;
      renderer.setSize(width, height);
      uniforms.resolution.value.x = renderer.domElement.width;
      uniforms.resolution.value.y = renderer.domElement.height;
    }

    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);

    // Animation loop
    function animate() {
      animationId = requestAnimationFrame(animate);
      uniforms.time.value += 0.05;
      renderer.render(scene, camera);
    }

    animate();
  }

  // Export globally
  window.initShaderAnimation = initShaderAnimation;
})();
