import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fingerprint2 from 'fingerprintjs2';

class Valve extends Component {
  constructor() {
    super();

    this.state = {
      fingerprint: "",
      isDisplayComponents: false,
      isDisplayOptionsPanel: false,
      isAutoRefresh: false,

      options_swfContainerId: "",
      options_swfPath: "",
      options_userDefinedFonts: "",
      options_excludeUserAgent: "",
      options_excludeLanguage: "",
      options_excludeColorDepth: "",
      options_excludeScreenResolution: "",
      options_excludeAvailableScreenResolution: "",
      options_excludeTimezoneOffset: "",
      options_excludeSessionStorage: "",
      options_excludeIndexedDB: "",
      options_excludeAddBehavior: "",
      options_excludeOpenDatabase: "",
      options_excludeCpuClass: "",
      options_excludePlatform: "",
      options_excludeDoNotTrack: "",
      options_excludeCanvas: "",
      options_excludeWebGL: "",
      options_excludeAdBlock: "",
      options_excludeHasLiedLanguages: "",
      options_excludeHasLiedResolution: "",
      options_excludeHasLiedOs: "",
      options_excludeHasLiedBrowser: "",
      options_excludeJsFonts: "",
      options_excludeFlashFonts: "",
      options_excludePlugins: "",
      options_excludeIEPlugins: "",
      options_excludeTouchSupport: "",
      options_excludePixelRatio: "",
      options_excludeHardwareConcurrency: ""
    };

    this.handle = {
      handleToggleDisplayComponents: this.handleToggleDisplayComponents.bind(this),
      handleToggleDisplayOptionsPanel: this.handleToggleDisplayOptionsPanel.bind(this),
      handleToggleAutoRefresh: this.handleToggleAutoRefresh.bind(this),
      handleCheckbox: this.handleCheckbox.bind(this),
      handleInputChange: this.handleInputChange.bind(this),
      handleGetFingerprint: this.handleGetFingerprint.bind(this),
      handleCheckAllExcludeOptions: this.handleCheckAllExcludeOptions.bind(this),
      handleRefresh: this.handleRefresh.bind(this)
    };
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

  handleInputChange(e) {
    let state = {};

    state[e.target.name] = e.target.value;

    this.setState(state);
  }

  getOptions() {
    let options = {};

    for(let state in this.state) {
      if(/^options_/.test(state)) {
        options[state.replace("options_", "")] = this.state[state];
      }
    }

    return options;
  }

  handleGetFingerprint() {
    let that = this;

    new Fingerprint2(this.getOptions()).get(function(result, components) {
      that.setState({
        fingerprint: {
          result: result, //a hash, representing your device fingerprint
          components: components // an array of FP components
        }
      });
    });
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

  handleRefresh() {
    if(this.state.isAutoRefresh) {
      this.handle.handleGetFingerprint();
    }
  }

  componentDidMount() {
    this.interval = window.setInterval(this.handle.handleRefresh, 1000);

    this.handleGetFingerprint();
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    let components = this.state.fingerprint.components && this.state.fingerprint.components.map(
        component => <tr key={"component_representation_" + component.key}>
          <th>{component.key}</th>
          <td><span className="word-break">{component.value}</span></td>
        </tr>
      );

    return (
      <div>
        <div className="page-header">
          <h1>fingerprintjs2<small> by Valve</small></h1>
        </div>
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Fingerprint</Link></li>
          <li className="active">fingerprintjs2</li>
        </ol>
        <div className="alert alert-info" role="alert">
          A hash, representing your device fingerprint
          <strong> {this.state.fingerprint.result} </strong>
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
                <div>
                  <label className="col-xs-2 control-label">
                    swfContainerId
                  </label>
                  <div className="col-xs-10">
                    <input type="text"
                           name="options_swfContainerId"
                           className="form-control"
                           value={this.state.options_swfContainerId}
                           onChange={this.handle.handleInputChange} />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div>
                  <label className="col-xs-2 control-label">
                    swfPath
                  </label>
                  <div className="col-xs-10">
                    <input type="text"
                           name="options_swfPath"
                           className="form-control"
                           value={this.state.options_swfPath}
                           onChange={this.handle.handleInputChange} />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div>
                  <label className="col-xs-2 control-label">
                    userDefinedFonts
                  </label>
                  <div className="col-xs-10">
                    <input type="text"
                           name="options_userDefinedFonts"
                           className="form-control"
                           value={this.state.options_userDefinedFonts}
                           onChange={this.handle.handleInputChange} />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox"
                             checked={this.state.options_excludeUserAgent && this.state.options_excludeLanguage && this.state.options_excludeColorDepth && this.state.options_excludeScreenResolution && this.state.options_excludeAvailableScreenResolution && this.state.options_excludeTimezoneOffset && this.state.options_excludeSessionStorage && this.state.options_excludeIndexedDB && this.state.options_excludeAddBehavior && this.state.options_excludeOpenDatabase && this.state.options_excludeCpuClass && this.state.options_excludePlatform && this.state.options_excludeDoNotTrack && this.state.options_excludeCanvas && this.state.options_excludeWebGL && this.state.options_excludeAdBlock && this.state.options_excludeHasLiedLanguages && this.state.options_excludeHasLiedResolution && this.state.options_excludeHasLiedOs && this.state.options_excludeHasLiedBrowser && this.state.options_excludeJsFonts && this.state.options_excludeFlashFonts && this.state.options_excludePlugins && this.state.options_excludeIEPlugins && this.state.options_excludeTouchSupport && this.state.options_excludePixelRatio && this.state.options_excludeHardwareConcurrency}
                             onChange={this.handle.handleCheckAllExcludeOptions} /> Check All
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeUserAgent" checked={this.state.options_excludeUserAgent} onChange={this.handle.handleCheckbox}/> excludeUserAgent - user agent should not take part in FP calculation
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeLanguage" checked={this.state.options_excludeLanguage} onChange={this.handle.handleCheckbox}/> excludeLanguage - browser language
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeColorDepth" checked={this.state.options_excludeColorDepth} onChange={this.handle.handleCheckbox}/> excludeColorDepth - color depth
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeScreenResolution" checked={this.state.options_excludeScreenResolution} onChange={this.handle.handleCheckbox}/> excludeScreenResolution - screen resolution
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeAvailableScreenResolution" checked={this.state.options_excludeAvailableScreenResolution} onChange={this.handle.handleCheckbox}/> excludeAvailableScreenResolution
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeTimezoneOffset" checked={this.state.options_excludeTimezoneOffset} onChange={this.handle.handleCheckbox}/> excludeTimezoneOffset
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeSessionStorage" checked={this.state.options_excludeSessionStorage} onChange={this.handle.handleCheckbox}/> excludeSessionStorage - user browser support of session storage
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeIndexedDB" checked={this.state.options_excludeIndexedDB} onChange={this.handle.handleCheckbox}/> excludeIndexedDB - user browser support of IndexedDB
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeAddBehavior" checked={this.state.options_excludeAddBehavior} onChange={this.handle.handleCheckbox}/> excludeAddBehavior - IE specific 'AddBehavior' method detection
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeOpenDatabase" checked={this.state.options_excludeOpenDatabase} onChange={this.handle.handleCheckbox}/> excludeOpenDatabase - user browser support of OpenDatabase
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeCpuClass" checked={this.state.options_excludeCpuClass} onChange={this.handle.handleCheckbox}/> excludeCpuClass - detection of CPU class
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludePlatform" checked={this.state.options_excludePlatform} onChange={this.handle.handleCheckbox}/> excludePlatform - detection of OS platform
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeDoNotTrack" checked={this.state.options_excludeDoNotTrack} onChange={this.handle.handleCheckbox}/> excludeDoNotTrack - is DoNotTrack set
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeCanvas" checked={this.state.options_excludeCanvas} onChange={this.handle.handleCheckbox}/> excludeCanvas - skip canvas fingerprinting entirely (you will most likely not need to set this to true)
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeWebGL" checked={this.state.options_excludeWebGL} onChange={this.handle.handleCheckbox}/> excludeWebGL - skip WebGL fingerprinting
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeAdBlock" checked={this.state.options_excludeAdBlock} onChange={this.handle.handleCheckbox}/> excludeAdBlock - skip AdBlock detection
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeHasLiedLanguages" checked={this.state.options_excludeHasLiedLanguages} onChange={this.handle.handleCheckbox}/> excludeHasLiedLanguages - skip check if user is trying to hide his browser language
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeHasLiedResolution" checked={this.state.options_excludeHasLiedResolution} onChange={this.handle.handleCheckbox}/> excludeHasLiedResolution - skip check if user is trying to hide his screen resolution
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeHasLiedOs" checked={this.state.options_excludeHasLiedOs} onChange={this.handle.handleCheckbox}/> excludeHasLiedOs - skip check if user is trying to hide his OS info
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeHasLiedBrowser" checked={this.state.options_excludeHasLiedBrowser} onChange={this.handle.handleCheckbox}/> excludeHasLiedBrowser - skip check if user is trying to hide his browser information
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeJsFonts" checked={this.state.options_excludeJsFonts} onChange={this.handle.handleCheckbox}/> excludeJsFonts - skip font detection with CSS "side channel"
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeFlashFonts" checked={this.state.options_excludeFlashFonts} onChange={this.handle.handleCheckbox}/> excludeFlashFonts - skip font detection with Flash (disabled by default)
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludePlugins" checked={this.state.options_excludePlugins} onChange={this.handle.handleCheckbox}/> excludePlugins - skip plugin enumeration/detection
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeIEPlugins" checked={this.state.options_excludeIEPlugins} onChange={this.handle.handleCheckbox}/> excludeIEPlugins - skip IE plugin enumeration/detection
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeTouchSupport" checked={this.state.options_excludeTouchSupport} onChange={this.handle.handleCheckbox}/> excludeTouchSupport - skip touch screen specific info fingerprinting
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludePixelRatio" checked={this.state.options_excludePixelRatio} onChange={this.handle.handleCheckbox}/> excludePixelRatio - skip device pixel ratio
                    </label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-xs-offset-1">
                  <div className="checkbox">
                    <label>
                      <input type="checkbox" name="options_excludeHardwareConcurrency" checked={this.state.options_excludeHardwareConcurrency} onChange={this.handle.handleCheckbox}/> excludeHardwareConcurrency - skip hardware concurrency
                    </label>
                  </div>
                </div>
              </div>
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

export default Valve;