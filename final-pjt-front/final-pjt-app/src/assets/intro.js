import * as THREE from './../../intro/three.js-master/build/three.module.js';
// import { OrbitControls } from "./three.js-master/examples/jsm/controls/OrbitControls.js"
import { GLTFLoader } from "./../../intro/three.js-master/examples/jsm/loaders/GLTFLoader.js"

class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container")
        this._divContainer = divContainer // 다른 method에서도 활용하기 위함

        const renderer = new THREE.WebGLRenderer({ antialias: true }) // 3차원 장면이 렌더링될때 부드럽게
        renderer.setPixelRatio(window.devicePixelRatio)
        divContainer.appendChild(renderer.domElement)

        this._renderer = renderer

        const scene = new THREE.Scene()
        this._scene = scene // field화 시킨다고 함
        // const axesHelper = new THREE.AxesHelper() 
        // scene.add(axesHelper)

        const clock = new THREE.Clock()
        this._clock = clock


        this._setupCamera()
        this._setupLight()
        this._setupModel()


        // bind: resize에서 this가 가리키는 객체가 event 객체가 아닌 App class 의 객체가 되도록 하기 위함
        window.onresize = this.resize.bind(this) 
        // rederer나 camera를 창 크기에 맞게 설정
        this.resize()

        requestAnimationFrame(this.render.bind(this))
        
    }


    _setupModel() {
        const gltfLoader = new GLTFLoader()
        const url = 'img/scene.gltf'
        gltfLoader.load(
            url, 
            (gltf) => {
                const tv = gltf.scene
                this._scene.add(tv)
                this._tv = tv
            }
        )
    }

    _setupCamera() {
        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            100
        );

        camera.position.z = 3
        this._camera = camera

        this._scene.add(this._camera)
    }

    _setupLight() {
        const color = 0xffffff
        const intensity = 1.6
        const light = new THREE.DirectionalLight(color, intensity)
        light.position.set(-1, 2, 4)
        this._scene.add(light);
    }
    // time인자를 통해 장면의 animation에 이용 가능
    render() {
      // this.update(time)
        const elapsedTime = this._clock.getElapsedTime()
        if (this._tv) {
        this._tv.position.x = Math.sin(elapsedTime) + 1
        this._tv.position.y = Math.sin(elapsedTime) + 1
        this._camera.lookAt(this._tv.position)
        // console.log(this._tv.position.x)
        // console.log(this._tv.position.y)
        if (this._tv.position.x <= 0.01) {
                return
            }
        }
      // // console.log(elapsedTime)
      // if (elapsedTime >= 4) {
      //   return
      // }
    

        this._renderer.render(this._scene, this._camera)
        
        requestAnimationFrame(this.render.bind(this))
    }

    // update method에서 어떠한 속성값을 변경시킴
    // update(time) {
    //   // while (time < 6) {
    //     if (this._tv) {
    //       time *= 0.001; // second unit
    //       this._camera.rotation.z = time
    //       this._tv.rotation.x = time
    //       // console.log(this._tv.position)
    //       // this._tv.rotation.z = time
    //       // console.log(time)
    //     }
    //   // }
    // }


    resize() {
        const width = this._divContainer.clientWidth
        const height = this._divContainer.clientHeight

        this._camera.aspect = width / height
        this._camera.updateProjectionMatrix()
        
        this._renderer.setSize(width, height)
    }
}

window.onload = function () {
    new App()
}

//////////////////////////////

// var canvas = document.getElementById('canvas'),

// /* The getContext() method returns an object
// that provides methods and properties for
// drawing on the canvas. */
// ctx = canvas.getContext('2d');

// /* Setting canvas width and height equal to
// window screen width and height. */
// function resize() {
//     canvas.width = window.innerWidth/2;
//     canvas.height = window.innerHeight/2;
// }
// resize();
// window.onresize = resize;

// // Function to generate noise effect
// function generate_noise(ctx) {
//     var w = ctx.canvas.width,
//     h = ctx.canvas.height,
    
//     /* This creates a new ImageData object
//     with the specified dimensions(i.e canvas
//     width and height). All pixels are set to
//     transparent black (i.e rgba(0,0,0,0)). */
//     idata = ctx.createImageData(w, h),
    
//     // Creating Uint32Array typed array
//     buffer32 = new Uint32Array(idata.data.buffer),
//     buffer_len = buffer32.length,
//     i = 0
    
//     for ( ; i < buffer_len; i++)
//         buffer32[i] =
//             ((255 * Math.random()) | 0) << 24;
    
//     /* The putImageData() method puts the image
//     data (from a specified ImageData object)
//     back onto the canvas. */
//     ctx.putImageData(idata, 0, 0);
// }

// // Creating animation effect
// var toggle = true;
// (function loop() {
//     toggle = !toggle
//     if (toggle) {

//         // Loop function is called each time
//         // before next repaint.
//         requestAnimationFrame(loop);
//         return;
//     }
// generate_noise(ctx);
// requestAnimationFrame(loop);
// })();