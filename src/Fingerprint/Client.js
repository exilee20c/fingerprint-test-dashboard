import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Client extends Component {
  constructor() {
    super();

    this.state = {
      isDisplayComponents: false,
      isDisplayOptionsPanel: false,
      isAutoRefresh: false,

      options_count: 1,
      options_isCutsom: false
    };

    this.handle = {
      handleToggleDisplayComponents: this.handleToggleDisplayComponents.bind(this),
      handleToggleDisplayOptionsPanel: this.handleToggleDisplayOptionsPanel.bind(this),
      handleToggleAutoRefresh: this.handleToggleAutoRefresh.bind(this),
      handleCheckbox: this.handleCheckbox.bind(this),
      handleSpin: this.handleSpin.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      handleGetFingerprint: this.initClientJS.bind(this),
      handleCheckAllExcludeOptions: this.handleCheckAllExcludeOptions.bind(this),
      handleRefresh: this.handleRefresh.bind(this)
    };

    this.client = new window.ClientJS();
  }

  handleToggleDisplayComponents() {
    this.setState({isDisplayComponents: !this.state.isDisplayComponents});
  }

  handleToggleDisplayOptionsPanel() {
    this.setState({isDisplayOptionsPanel: !this.state.isDisplayOptionsPanel}, this.handle.handleGetFingerprint);
  }

  handleToggleAutoRefresh() {
    this.setState({isAutoRefresh: !this.state.isAutoRefresh});
  }

  handleCheckbox(e) {
    let state = {};

    state[e.target.name] = e.target.checked;

    this.setState(state);
  }

  handleSpin(e) {
    let state = {};

    if(e.target.value > -1) {
      state[e.target.name] = e.target.value;
    }

    this.setState(state);
  }

  handleInputChange(e) {
    let state = {};

    state[e.target.name] = e.target.value;

    this.setState(state);
  }

  handleRefresh() {
    if(this.state.isAutoRefresh) {
      this.handle.handleGetFingerprint();
    }
  }

  handleCheckAllExcludeOptions(e) {
    let options = {};

    for(let state in this.state) {
      if(/^options_exclude/.test(state)) {
        options[state] = e.target.checked;
      }
    }

    this.setState(options);
  }

  getFingerprint() {
    if(this.state.options_isCutsom) {
      this.getCustomFingerprint();
    } else {
      this.setState({fingerprint: this.client.getFingerprint()});
    }
  }

  getCustomFingerprint() {
    let options = [];
    let count = 1;

    for(let key in this.state) {
      if(/^options_custom_input_/.test(key)) {
        if(count <= this.state.options_count) {
          options.push(this.state[key]);
        }

        count++;
      }
    }

    this.setState({fingerprint: this.client.getCustomFingerprint(...options)});
  }

  getClientJS() {
    this.setState({info_softwareVersion: this.client.getSoftwareVersion()});
  }

  getUserAgent() {
    this.setState({info_userAgent: this.client.getUserAgent()});
  }

  getBrowser() {
    this.setState({
      info_browser: this.client.getBrowser(),
      info_browserVersion: this.client.getBrowserVersion()
    });
  }

  getEngine() {
    this.setState({
      info_engine: this.client.getEngine(),
      info_engineVersion: this.client.getEngineVersion()
    });
  }

  getOS() {
    this.setState({
      info_OS: this.client.getOS(),
      info_OSVersion: this.client.getOSVersion()
    });
  }

  getDevice() {
    this.setState({
      info_device: this.client.getDevice(),
      info_deviceType: this.client.getDeviceType(),
      info_deviceVendor: this.client.getDeviceVendor()
    });
  }

  getCPU() {
    this.setState({
      info_CPU: this.client.getCPU()
    });
  }

  isMobile() {
    this.setState({
      info_isMobile: this.client.isMobile(),
      info_isMobileIOS: this.client.isMobileIOS()
    });
  }

  getScreen() {
    this.setState({
      info_screenPrint: this.client.getScreenPrint(),
      info_colorDepth: this.client.getColorDepth(),
      info_currentResolution: this.client.getCurrentResolution(),
      info_availableResolution: this.client.getAvailableResolution(),
      info_deviceXDPI: this.client.getDeviceXDPI(),
      info_deviceYDPI: this.client.getDeviceYDPI(),
    });
  }

  getPlugins() {
    this.setState({info_plugins: this.client.getPlugins()});
  }

  getMimeType() {
    this.setState({
      info_isMimeTypes: this.client.isMimeTypes(),
      info_mimeTypes: this.client.getMimeTypes()
    });
  }

  getFonts() {
    this.setState({info_fonts: this.client.getFonts()});
  }

  getStorage() {
    this.setState({
      info_isLocalStorage: this.client.isLocalStorage(),
      info_isSessionStorage: this.client.isSessionStorage(),
      info_isCookie: this.client.isCookie()
    });
  }

  getTimeZone() {
    this.setState({info_timeZone: this.client.getTimeZone()});
  }

  getLanguage() {
    this.setState({info_language: this.client.getLanguage()});
  }

  getCanvasPrint() {
    this.setState({info_canvasPrint: this.client.getCanvasPrint()});
  }

  initClientJS() {
    this.getFingerprint();
    this.getClientJS();
    this.getUserAgent();
    this.getBrowser();
    this.getEngine();
    this.getOS();
    this.getDevice();
    this.getCPU();
    this.isMobile();
    this.getScreen();
    this.getPlugins();
    this.getMimeType();
    this.getFonts();
    this.getStorage();
    this.getTimeZone();
    this.getLanguage();
    this.getCanvasPrint();
  }

  componentDidMount() {
    this.interval = window.setInterval(this.handle.handleRefresh, 1000);

    this.initClientJS();
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    let components = [];

    for(let key in this.state) {
      if(/^info_/.test(key)) {
        let info_header = key.replace("info_", "");
        components.push(<tr key={"component_representation_" + info_header}>
          <th>{info_header}</th>
          <td><span className="word-break">{this.state[key]}</span></td>
        </tr>);
      }
    }

    let customInput = [];

    for(let i = 0; i < this.state.options_count; i++) {
      customInput.push(<div key={"options_custom_input_div_" + i} className="form-group">
        <div className="col-xs-offset-1">
          <label className="col-xs-2 control-label">
            option[{i}]
          </label>
          <div className="col-xs-10">
            <input type="text"
                   name={"options_custom_input_" + i}
                   className="form-control"
                   value={this.state["options_custom_input_" + i]}
                   onChange={this.handle.handleInputChange} />
          </div>
        </div>
      </div>);
    }

    return (
      <div>
        <div className="page-header">
          <h1>ClientJS<small> by jackspirou</small></h1>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Fingerprint</Link></li>
          <li className="active">ClientJS</li>
        </ol>
        <div className="alert alert-info" role="alert">
          A hash, representing your device fingerprint
          <strong> {this.state.fingerprint} </strong>
          has been generated!
          <p className="mgt-10">
            <a className={"btn btn-" + (this.state.isDisplayComponents ? "primary" : "default")} role="button" onClick={this.handle.handleToggleDisplayComponents}>{this.state.isDisplayComponents ? "OK, I got it !" : "Learn more !"}</a>
            <a className={"btn btn-" + (this.state.isDisplayOptionsPanel ? "primary" : "default") + " mgl-5"} role="button" onClick={this.handle.handleToggleDisplayOptionsPanel}>
              <span className="glyphicon glyphicon-cog" aria-hidden="true" />
              {this.state.isDisplayOptionsPanel ? " Save and Reload" : ""}
            </a>
            <a className={"btn btn-" + (this.state.isAutoRefresh ? "primary" : "default") + " mgl-5"} role="button" onClick={this.handle.handleToggleAutoRefresh}>
              <span className="glyphicon glyphicon-refresh" aria-hidden="true" />
            </a>
          </p>
        </div>
        {
          this.state.isDisplayOptionsPanel ?
            <form className="form-horizontal">
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox"
                             name="options_isCutsom"
                             checked={this.state.options_isCutsom}
                             onChange={this.handle.handleCheckbox} /> Use Custom Fingerprint
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <label className="col-xs-2 control-label">
                    amount of options
                  </label>
                  <div className="col-xs-10">
                    <input type="number"
                           name="options_count"
                           className="form-control"
                           value={this.state.options_count}
                           onChange={this.handle.handleSpin} />
                  </div>
                </div>
              </div>
              {customInput}
            </form>
            :
            ""
        }
        {
          this.state.isDisplayComponents ?
            (
              components.length > 0 ?
                <table className="table">
                  <tbody>
                  {components}
                  </tbody>
                </table>
                :
                <div className="alert alert-success" role="alert">
                  이런! <strong>fingerprint</strong>의 생성에 관여하는 <strong>구성요소</strong>가 없습니다! <strong>설정</strong>을 바꿔보시는건 어떤가요?
                </div>
            )
            :
            ""
        }
      </div>
    );
  }
}

export default Client;