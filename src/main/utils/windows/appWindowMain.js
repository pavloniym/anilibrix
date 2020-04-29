import Window from './appWindow'

class WindowMain extends Window {


  /**
   * Get window configuration
   *
   * @return Object
   */
  getWindowConfiguration() {

    const width = 1000;
    const height = 720;
    const minWidth = width;
    const minHeight = height;

    return {
      height,
      width,
      minWidth,
      minHeight,
      show: true,
      frame: false,
      darkTheme: true,
      useContentSize: true,
      webPreferences: {
        nodeIntegration: true,
        plugins: true,
      },
      backgroundColor: '#121212'
    }
  }


  /**
   * Get window url
   *
   * @return {string}
   */
  getWindowUrl() {
    return process.env.NODE_ENV === 'development'
      ? 'http://localhost:9080'
      : `file://${__dirname}/index.html`;
  }

}


export default new WindowMain();
