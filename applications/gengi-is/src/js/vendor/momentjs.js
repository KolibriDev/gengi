define(['exports', 'module', 'vendor/moment-is', 'vendor/moment-timezone'], function (exports, module, _vendorMomentIs, _vendorMomentTimezone) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _moment = _interopRequireDefault(_vendorMomentTimezone);

  _moment['default'].locale('is');
  _moment['default'].tz.setDefault('Atlantic/Reykjavik');

  module.exports = _moment['default'];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvbW9tZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFZLENBQUM7Ozs7Ozs7Ozs7QUFJYixxQkFBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIscUJBQU8sRUFBRSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDIiwiZmlsZSI6Im1vZHVsZXMvbW9tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IG1vbWVudElTIGZyb20gJ3ZlbmRvci9tb21lbnQtaXMnOyAvLyBqc2hpbnQgaWdub3JlOmxpbmVcbmltcG9ydCBtb21lbnQgZnJvbSAndmVuZG9yL21vbWVudC10aW1lem9uZSc7XG5cbm1vbWVudC5sb2NhbGUoJ2lzJyk7XG5tb21lbnQudHouc2V0RGVmYXVsdCgnQXRsYW50aWMvUmV5a2phdmlrJyk7XG5cbmV4cG9ydCBkZWZhdWx0IG1vbWVudDtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
