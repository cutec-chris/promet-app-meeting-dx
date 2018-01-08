var Meetings;
dhtmlxEvent(window,"load",function(){
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
    aForm.Tabs.addTab(
    "users",       // id
    "Teilnehmer",    // tab text
    null,       // auto width
    null,       // last position
    false,      // inactive
    true);
    aForm.Tabs.tabs("content").setActive();
    //aForm.Tabs.tabs("content").attachURL(GetBaseUrl()+'/meeting/by-id/'+aForm.Id+'/reports/Standart.pdf');
  }
});
