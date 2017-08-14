var Meetings;
dhtmlxEvent(window,"load",function(){
  Meetings = newPrometList('meetings','Besprechungen');
  Meetings.Grid.setHeader(["Nummer","Name","Status","ersteller"]);
  Meetings.Grid.setColumnIds('ID,NAME,STATUS,CREATEDBY')
  Meetings.Grid.setColTypes("txt,txt,txt,txt");
  Meetings.Grid.attachHeader("#text_filter,#text_filter,#select_filter,#text_filter");
  Meetings.Grid.init();
});
