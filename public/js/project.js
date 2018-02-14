/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 168);
/******/ })
/************************************************************************/
/******/ ({

/***/ 134:
/***/ (function(module, exports) {

var now = moment().format('YYYY-MM-DD');

new Vue({
  el: '#project',
  data: {
    projects: [],
    search: '',
    filtered: [],
    prj_no: '',
    prj_name: '',
    quo_no: '',
    prj_from: now,
    prj_to: now,
    customer: '',
    description: ''
  },
  mounted: function mounted() {
    var _this = this;

    // datepicker setup
    $('.input-group.date').datepicker({
      maxViewMode: 2,
      format: 'yyyy-mm-dd',
      orientation: 'bottom auto',
      autoclose: true
    }).on('changeDate', function () {
      _this.prj_from = $('#prj_from').val();
      _this.prj_to = $('#prj_to').val();
      if (moment(_this.prj_to) < moment(_this.prj_from)) {
        _this.prj_to = _this.prj_from;
        $('#prj_to').val(_this.prj_from);
      }
      console.log(_this.prj_from);
      $('#to').datepicker('setStartDate', _this.prj_from);
    });
    this.fetch();
    console.log(this.filtered);
  },

  watch: {
    search: function search(val) {
      var _this2 = this;

      this.filtered = [];
      if (val.lenght < 2) {
        this.filtered = this.projects;
      } else {
        var regexp = new RegExp(val, 'i');
        this.projects.forEach(function (project) {
          if (regexp.test(project.prj_no) || regexp.test(project.prj_name) || regexp.test(project.customer) || regexp.test(project.quo_no)) {
            _this2.filtered.push(project);
          }
        });
      }
    }
  },
  methods: {
    fetch: function fetch() {
      var _this3 = this;

      axios.get('/project/fetch').then(function (response) {
        console.log(response);
        _this3.projects = response.data;
        _this3.filtered = _this3.projects;
      }).catch(function (error) {
        console.log(error);
      });
    },
    show: function show(project) {
      window.location.href = '/project/' + project.prj_no;
    },
    store: function store() {
      var _this4 = this;

      var project = {
        prj_no: this.prj_no,
        prj_name: this.prj_name,
        quo_no: this.quo_no,
        customer: this.customer,
        prj_from: this.prj_from,
        prj_to: this.prj_to,
        description: this.description,
        status: 'In Progress'
      };
      axios.post('/project/store', project).then(function (response) {
        console.log(response);
        _this4.projects.unshift(project);
      }).catch(function (error) {
        console.log(error);
      });
    },
    destroy: function destroy(index) {
      var _this5 = this;

      axios.delete('/project/destroy', {
        params: {
          prj_no: this.projects[index].prj_no
        }
      }).then(function (response) {
        console.log(response);
        _this5.projects.splice(index, 1);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }
});

/***/ }),

/***/ 168:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(134);


/***/ })

/******/ });