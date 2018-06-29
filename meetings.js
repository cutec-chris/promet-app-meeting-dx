rtl.module("meetings",["System","JS","Web","Classes","Avamm","webrouter","AvammForms","dhtmlx_base","SysUtils","dhtmlx_grid"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass($mod,"TMeetingForm",pas.AvammForms.TAvammForm,function () {
    this.$init = function () {
      pas.AvammForms.TAvammForm.$init.call(this);
      this.MeetingGrid = null;
      this.UsersGrid = null;
    };
    this.$final = function () {
      this.MeetingGrid = undefined;
      this.UsersGrid = undefined;
      pas.AvammForms.TAvammForm.$final.call(this);
    };
    this.DoOnCreate = function () {
      this.Tabs.addTab("content",rtl.getResStr(pas.meetings,"strContent"),null,0,true,false);
      this.MeetingGrid = rtl.getObject(this.Tabs.cells("content").attachGrid(pas.JS.New([])));
      this.MeetingGrid.setHeader("Inhalt",",",Array.of({}));
      this.MeetingGrid.setColumnIds("desc");
      this.MeetingGrid.setColTypes("ro");
      this.MeetingGrid.enableMultiline(true);
      this.MeetingGrid.enableAutoWidth(true);
      this.MeetingGrid.enableKeyboardSupport(true);
      this.MeetingGrid.init();
      this.Tabs.addTab("users",rtl.getResStr(pas.meetings,"strUsers"),null,0,false,false);
      this.UsersGrid = rtl.getObject(this.Tabs.cells("users").attachGrid(pas.JS.New([])));
      this.UsersGrid.setHeader("Name,Code,Anwesend",",",Array.of({}));
      this.UsersGrid.setColumnIds("name,idcode,active");
      this.UsersGrid.setColTypes("edtxt,edtxt,edtxt");
      this.UsersGrid.init();
    };
    this.DoOpen = function () {
    };
    this.DoLoadData = function () {
      this.DoOnCreate();
      this.DoOpen();
      pas.AvammForms.TAvammForm.DoLoadData.call(this);
    };
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
  $mod.$resourcestrings = {strMeeting: {org: "Besprechungen"}, strContent: {org: "Inhalt"}, strUsers: {org: "Teilnehmer"}};
  $mod.$init = function () {
    if (pas.Avamm.getRight("Meeting") > 0) pas.Avamm.RegisterSidebarRoute(rtl.getResStr(pas.meetings,"strMeeting"),"Meeting",$mod.ShowMeetingList);
    pas.webrouter.Router().RegisterRoute("\/Meeting\/by-id\/:Id\/",$mod.ShowMeeting,false);
  };
});
//# sourceMappingURL=meetings.js.map
