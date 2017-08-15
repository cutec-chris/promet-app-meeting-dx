var Meetings;
dhtmlxEvent(window,"load",function(){
  Meetings = newPrometList('meetings','Besprechungen');
  Meetings.Grid.setHeader(["Name","Status","Datum","ersteller"]);
  Meetings.Grid.setColumnIds('NAME,STATUS,DATE,CREATEDBY')
  Meetings.Grid.setColTypes("txt,txt,txt,txt");
  Meetings.Grid.attachHeader("#text_filter,#text_filter,,#text_filter");
  //Meetings.Grid.setColumnMinWidth('30' , 0);
  Meetings.Grid.setInitWidths('*,70,150,70');
  Meetings.Grid.init();
});
