rtl.module("meetings",["System","JS","Web","Classes","Avamm","webrouter","AvammForms","dhtmlx_base","SysUtils","dhtmlx_grid"],function () {
  "use strict";
  var $mod = this;
  rtl.createClass($mod,"TMeetingForm",pas.AvammForms.TAvammForm,function () {
    this.$init = function () {
      pas.AvammForms.TAvammForm.$init.call(this);
      this.MeetingGrid = null;
      this.UsersGrid = null;
      this.Meetingentrys = null;
      this.Meetingusers = null;
    };
    this.$final = function () {
      this.MeetingGrid = undefined;
      this.UsersGrid = undefined;
      this.Meetingentrys = undefined;
      this.Meetingusers = undefined;
      pas.AvammForms.TAvammForm.$final.call(this);
    };
    this.DoOnCreate = function () {
      this.Tabs.addTab("content",rtl.getResStr(pas.meetings,"strContent"),null,0,true,false);
      this.MeetingGrid = rtl.getObject(this.Tabs.cells("content").attachGrid(pas.JS.New([])));
      this.MeetingGrid.setHeader("Inhalt,Bearbeiter,Termin,Verantwortlich",",",Array.of({}));
      this.MeetingGrid.setColumnIds("DESC,USER,DUEDATE,OWNER");
      this.MeetingGrid.setColTypes("ro,ro,ro,ro");
      this.MeetingGrid.setInitWidths("*,100,70,100");
      this.MeetingGrid.enableMultiline(true);
      this.MeetingGrid.enableAutoWidth(true);
      this.MeetingGrid.enableKeyboardSupport(true);
      this.MeetingGrid.init();
      this.Tabs.addTab("users",rtl.getResStr(pas.meetings,"strUsers"),null,1,false,false);
      this.UsersGrid = rtl.getObject(this.Tabs.cells("users").attachGrid(pas.JS.New([])));
      this.UsersGrid.setHeader("Name,Code,Anwesend",",",Array.of({}));
      this.UsersGrid.setColumnIds("NAME,IDCODE,ACTIVE");
      this.UsersGrid.setColTypes("edtxt,edtxt,edtxt");
      this.UsersGrid.init();
    };
    this.DoOpen = function () {
      var i = 0;
      var nEntry = null;
      if (rtl.isExt(this.FData["MEETINGENTRYS"],Object,1)) {
        this.Meetingentrys = rtl.getObject(rtl.getObject(this.FData["MEETINGENTRYS"])["Data"])}
       else this.Meetingentrys = rtl.getObject(this.FData["MEETINGENTRYS"]);
      if (rtl.isExt(this.FData["MEETINGUSERS"],Object,1)) {
        this.Meetingusers = rtl.getObject(rtl.getObject(this.FData["MEETINGUSERS"])["Data"])}
       else this.Meetingusers = rtl.getObject(this.FData["MEETINGUSERS"]);
      this.MeetingGrid.clearAll();
      for (var $l1 = 0, $end2 = this.Meetingentrys.length - 1; $l1 <= $end2; $l1++) {
        i = $l1;
        nEntry = new Array();
        if (pas.System.Assigned(rtl.getObject(this.Meetingentrys[i])["LINK"]) && (pas.System.Copy("" + rtl.getObject(this.Meetingentrys[i])["LINK"],0,8) === "PROJECTS")) {
          nEntry.push(("<b>" + ("" + rtl.getObject(this.Meetingentrys[i])["DESC"])) + "<\/b>")}
         else nEntry.push(pas.SysUtils.StringReplace("" + rtl.getObject(this.Meetingentrys[i])["DESC"],"\r","<br>",rtl.createSet(pas.SysUtils.TStringReplaceFlag.rfReplaceAll)));
        nEntry.push(rtl.getObject(this.Meetingentrys[i])["USER"]);
        nEntry.push(rtl.getObject(this.Meetingentrys[i])["DUEDATE"]);
        nEntry.push(rtl.getObject(this.Meetingentrys[i])["OWNER"]);
        this.MeetingGrid.addRow(rtl.getObject(this.Meetingentrys[i])["sql_id"],nEntry);
      };
      for (var $l3 = 0, $end4 = this.Meetingusers.length - 1; $l3 <= $end4; $l3++) {
        i = $l3;
        nEntry = new Array();
        nEntry.push("" + rtl.getObject(this.Meetingusers[i])["NAME"]);
        nEntry.push(rtl.getObject(this.Meetingusers[i])["IDCODE"]);
        nEntry.push(rtl.getObject(this.Meetingusers[i])["ACTIVE"]);
        this.UsersGrid.addRow(rtl.getObject(this.Meetingusers[i])["sql_id"],nEntry);
      };
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
    aForm = $mod.TMeetingForm.$create("Create$1",[pas.AvammForms.TAvammFormMode.fmInlineWindow,"meetings",Params.GetValue("Id"),""]);
  };
  this.ShowMeetingList = function (URl, aRoute, Params) {
    var aParent = null;
    if ($mod.Meeting === null) {
      aParent = rtl.getObject(pas.Avamm.GetAvammContainer());
      $mod.Meeting = pas.AvammForms.TAvammListForm.$create("Create$1",[aParent,"meetings","1C"]);
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
    if (pas.Avamm.getRight("meetings") > 0) pas.Avamm.RegisterSidebarRoute(rtl.getResStr(pas.meetings,"strMeeting"),"Meeting",$mod.ShowMeetingList);
    pas.webrouter.Router().RegisterRoute("\/meetings\/by-id\/:Id\/",$mod.ShowMeeting,false);
  };
});
//# sourceMappingURL=meetings.js.map
