var Meetings;
window.addEventListener('AfterLogin',function(){
  Meetings = newPrometList('meetings','Besprechungen');
  Meetings.Grid.setHeader(["Name","Status","Datum","ersteller"]);
  Meetings.Grid.setColumnIds('NAME,STATUS,DATE,CREATEDBY')
  Meetings.Grid.setColTypes("ro,ro,ro,ro");
  Meetings.Grid.attachHeader("#text_filter,#text_filter,,#text_filter");
  //Meetings.Grid.setColumnMinWidth('30' , 0);
  Meetings.Grid.setInitWidths('*,70,80,70');
  Meetings.Grid.init();
  Meetings.OnCreateForm = function(aForm) {
    aForm.Tabs.addTab(
    "content",       // id
    "Inhalt",    // tab text
    null,       // auto width
    null,       // last position
    false,      // inactive
    true);
    aForm.MeetingGrid = aForm.Tabs.tabs("content").attachGrid();
    aForm.MeetingGrid.setHeader(["Inhalt"]);
    aForm.MeetingGrid.setColumnIds('desc');
    aForm.MeetingGrid.setColTypes("ro");
    aForm.MeetingGrid.enableMultiline(true);
		aForm.MeetingGrid.enableAutoWidth(true);
    aForm.MeetingGrid.enableKeyboardSupport(true);
    aForm.MeetingGrid.init();
    aForm.Tabs.addTab(
    "users",       // id
    "Teilnehmer",    // tab text
    null,       // auto width
    null,       // last position
    false,      // inactive
    true);
    aForm.UsersGrid = aForm.Tabs.tabs("users").attachGrid();
    aForm.UsersGrid.setHeader(["Name","Code","Anwesend"]);
    aForm.UsersGrid.setColumnIds('name,idcode,active');
    aForm.UsersGrid.setColTypes("edtxt,edtxt,edtxt");
    aForm.UsersGrid.init();
    aForm.Tabs.tabs("content").setActive();
    //aForm.Tabs.tabs("content").attachURL(GetBaseUrl()+'/meeting/by-id/'+aForm.Id+'/reports/Standart.pdf');
    aForm.OnDataUpdated = function(bForm) {
      for (var i = 0; i < bForm.Data.MEETINGENTRYS.length; i++) {
        if (bForm.Data.MEETINGENTRYS[i].Fields.link != null)
          bForm.MeetingGrid.addRow(bForm.Data.MEETINGENTRYS[i].Fields.sql_id,['<b>'+bForm.Data.MEETINGENTRYS[i].Fields.desc.replace("\r\n","<br>")+'</b>'])
        else
          bForm.MeetingGrid.addRow(bForm.Data.MEETINGENTRYS[i].Fields.sql_id,[bForm.Data.MEETINGENTRYS[i].Fields.desc.replace("\r\n","<br>")])
      }

      for (var i = 0; i < bForm.Data.MEETINGUSERS.length; i++) {
        bForm.UsersGrid.addRow(bForm.Data.MEETINGUSERS[i].Fields.sql_id,[bForm.Data.MEETINGUSERS[i].Fields.name,bForm.Data.MEETINGUSERS[i].Fields.idcode,bForm.Data.MEETINGUSERS[i].Fields.active])
      }
    }
  }
});
