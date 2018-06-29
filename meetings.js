rtl.module("meetings",["System","JS","Web","Classes","Avamm","webrouter","AvammForms","dhtmlx_base","SysUtils"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass($mod,"TMeetingForm",pas.AvammForms.TAvammForm,function () {
  });
  this.Meeting = null;
  this.ShowMeeting = function (URl, aRoute, Params) {
    var aForm = null;
    aForm = $mod.TMeetingForm.$create("Create$1",[pas.AvammForms.TAvammFormMode.fmInlineWindow,"Meeting",Params.GetValue("Id"),""]);
  };
  this.ShowMeetingList = function (URl, aRoute, Params) {
    var aParent = null;
    if ($mod.Meeting === null) {
      aParent = rtl.getObject(pas.Avamm.GetAvammContainer());
      $mod.Meeting = pas.AvammForms.TAvammListForm.$create("Create$1",[aParent,"Meeting"]);
      var $with1 = $mod.Meeting;
      $with1.Grid.setHeader("Name,Status,Datum,ersteller",",",Array.of({}));
      $with1.Grid.setColumnIds("NAME,STATUS,DATE,CREATEDBY");
      $with1.Grid.attachHeader("#text_filter,#text_filter,,#text_filter");
      $with1.Grid.setInitWidths("*,70,80,70");
      $with1.Grid.init();
    };
    $mod.Meeting.Show();
  };
  $mod.$resourcestrings = {strMeeting: {org: "Besprechungen"}};
  $mod.$init = function () {
    if (pas.Avamm.getRight("Meeting") > 0) pas.Avamm.RegisterSidebarRoute(rtl.getResStr(pas.meetings,"strMeeting"),"Meeting",$mod.ShowMeetingList);
    pas.webrouter.Router().RegisterRoute("\/Meeting\/by-id\/:Id\/",$mod.ShowMeeting,false);
  };
});
//# sourceMappingURL=meetings.js.map
