import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

class Base3D{
    constructor(selector, onFinish) {
        this.container = document.querySelector(selector)
        this.camera
        this.scene
        this.renderer
        this.model
        this.panzi
        this.animeAction
        this.clock = new THREE.Clock()
        this.onFinish = onFinish
        this.init()
        this.animate()
        this.progressFn


    }

    // 响应进度
    onProgress(fun){
        this.progressFn = fun
    }

    // 初始化函数
    init(){
        this.initScene()
        this.initCamera()
        this.initRenderer()
        this.initControls()

        this.addMesh()

        // 绑定监听
        window.addEventListener('resize',this.onWindowResize.bind(this))
        window.addEventListener('mousewheel',this.onMouseWheel.bind(this))
    }

    // 初始化场景
    initScene(){
        this.scene = new THREE.Scene()
        this.setEnvMap('000')
    }

    // 初始化主相机
    initCamera(){
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.25 , 200)
        this.camera.position.set(-1.8,0.6,2.7)
    }

    // 初始化渲染器
    initRenderer(){
        // 使用WebGL渲染器 [antialias: 设置抗锯齿]
        this.renderer = new THREE.WebGLRenderer({ antialias:true })
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        // 色调映射(调节HDR动态范围)
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping
        // 设置曝光程度
        this.renderer.toneMappingExposure = 3
        this.container.appendChild(this.renderer.domElement)

    }

    // 初始化控制器
    initControls(){
        // 轨道控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    }

    // 设置场景加载
    setEnvMap(hdr){
        // RGBELoader用于加载hdr环境贴图
        new RGBELoader().setPath('./files/hdr/').load(hdr+".hdr", (texture) =>{
            texture.mapping = THREE.EquirectangularReflectionMapping // 加载环境贴图
            this.scene.background = texture // 设置场景背景色(天空盒色彩)
            this.scene.environment = texture // 设置场景环境
        })
    }

    // 渲染
    render(){
        let delta = this.clock.getDelta()
        this.mixer && this.mixer.update(delta)
        this.renderer.render(this.scene, this.camera)
    }

    // 设置渲染动画
    animate(){
        this.renderer.setAnimationLoop(this.render.bind(this))
    }

    // 设置模型
    setModel(modelName){
        return  new Promise((resolve,reject) => {
            const loader = new GLTFLoader().setPath('files/gltf/')
            loader.load(modelName, (gltf)=>{
                this.model && this.model.removeFromParent()
                this.model = gltf.scene.children[0]


                if('bag2.glb' === modelName && !this.panzi){
                    this.panzi = gltf.scene.children[5]
                    this.camera = gltf.cameras[0]
                    this.mixer = new THREE.AnimationMixer(gltf.scene.children[1])
                    this.animeAction = this.mixer.clipAction(gltf.animations[0])
                    this.animeAction.setDuration(20).setLoop(THREE.LoopOnce)
                    this.animeAction.clampWhenFinished = true

                    // 设置灯光
                    this.spotlight1 = gltf.scene.children[2].children[0]
                    this.spotlight1.intensity = 1
                    this.spotlight2 = gltf.scene.children[3].children[0]
                    this.spotlight2.intensity = 1
                    this.spotlight3 = gltf.scene.children[4].children[0]
                    this.spotlight3.intensity = 1
                }
                this.scene.add(gltf.scene)
                resolve(this.model+"Model Add Success")
            }, (e)=>{
                // 模型加载进度
                this.progressFn(e)
            })
        })
    }

    // 添加 Mesh对象
    async addMesh(){
        let res = await this.setModel('bag2.glb')
        this.onFinish(res)
    }

    // 设备窗口变化监听函数
    onWindowResize(){
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // 监听鼠标滚轮滚动
    onMouseWheel(e) {
        let timeScale = e.deltaY > 0 ? 1 : -1
        this.animeAction.setEffectiveTimeScale(timeScale)
        this.animeAction.paused = false
        this.animeAction.play()
        if(this.timerOutId){
            clearTimeout(this.timerOutId)
        }
        this.timerOutId = setTimeout(()=>{
            this.animeAction.halt(0.5)
        }, 300)
    }
}

export default Base3D