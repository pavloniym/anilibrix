import * as PIXI from "pixi.js";

import scale from '!raw-loader!./shaders/scale.glsl'
import vertex from '!raw-loader!./shaders/vertex.glsl'

//import test from '!raw-loader!./shaders/test.glsl'
import Anime4K_Upscale_CNN_L_x2_Denoise from '!raw-loader!./shaders/Anime4K_Upscale_CNN_L_x2_Denoise.glsl'


export default class Anime4K {
  constructor() {
    this._video = null;
    this._stage = null;
    this._width = null;
    this._height = null;
    this._renderer = null;
    this._container = null;
    this._is_enabled = true;
  }


  /**
   * Set container
   *
   * @param container
   * @return {Anime4K}
   */
  setContainer(container) {
    this._container = container;
    return this;
  }

  /**
   * Set video
   *
   * @param video
   * @return {Anime4K}
   */
  setVideo(video) {
    this._video = video;
    return this;
  }


  /**
   * Set resolution
   *
   * @param width
   * @param height
   * @return {Anime4K}
   */
  setResolution({width, height} = {}) {
    this._width = width;
    this._height = height;
    return this;
  }

  /**
   * Set is enabled
   *
   * @param is_enabled
   * @return {Anime4K}
   */
  setIsEnabled(is_enabled) {
    this._is_enabled = is_enabled && typeof is_enabled === 'function'
      ? is_enabled
      : () => false

    return this;
  }


  /**
   * Upscale
   *
   * @return {void}
   * @return {Anime4K}
   */
  upscale() {

    // Create canvas renderer
    // Add it to layout
    this._renderer = PIXI.autoDetectRenderer({width: this._width, height: this._height, transparent: true});
    this._container.appendChild(this._renderer.view);

    // Create the root of the scene graph
    this._stage = new PIXI.Container();

    // Create a video texture from a path
    const texture = PIXI.Texture.from(this._video);
    const sprite = new PIXI.Sprite(texture);

    // Set sprite width and height
    sprite.width = this._renderer.width;
    sprite.height = this._renderer.height;

    // Add sprite to stage
    this._stage.addChild(sprite);

    return this;
  }


  /**
   * Apply some shaders
   *
   * @return {void}
   */
  applyShaders() {


    if (this._is_enabled && this._is_enabled() === true) {

      const scales = new PIXI.Filter(vertex, scale, {u_texture: 0, u_size: [this._width, this._height]});


      this._stage.filters = [
        scales
      ]

    } else {
      this._stage.filters = [];
    }

  }


  /**
   * Render
   *
   * @return {void}
   */
  render() {

    // Render scene
    // Apply shaders
    this.applyShaders();
    this._renderer.render(this._stage);

    // Loop for each frame
    requestAnimationFrame(this.render.bind(this));
  }

}
