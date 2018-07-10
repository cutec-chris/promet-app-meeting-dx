library meetings;
  uses js, web, classes, Avamm, webrouter, AvammForms, dhtmlx_base,
    dhtmlx_form,SysUtils, Types,dhtmlx_grid;

type

  { TMeetingForm }

  TMeetingForm = class(TAvammForm)
  private
    MeetingGrid,UsersGrid: TDHTMLXGrid;
    Meetingentrys : TJSArray;
    Meetingusers : TJSArray;
  public
    procedure DoOnCreate;
    procedure DoOpen;
    procedure DoLoadData; override;
  end;

resourcestring
  strMeeting             = 'Besprechungen';
  strContent             = 'Inhalt';
  strUsers               = 'Teilnehmer';

var
  Meeting : TAvammListForm = nil;
Procedure ShowMeeting(URl : String; aRoute : TRoute; Params: TStrings);
var
  aForm: TAvammForm;
begin
  aForm := TMeetingForm.Create(fmInlineWindow,'meetings',Params.Values['Id']);
end;
Procedure ShowMeetingList(URl : String; aRoute : TRoute; Params: TStrings);
var
  aParent: TJSHTMLElement;
begin
  if Meeting = nil then
    begin
      aParent := TJSHTMLElement(GetAvammContainer());
      Meeting := TAvammListForm.Create(aParent,'meetings');
      with Meeting do
        begin
          Grid.setHeader('Name,Status,Datum,ersteller',',',TJSArray._of([]));
          Grid.setColumnIds('NAME,STATUS,DATE,CREATEDBY');
          Grid.attachHeader('#text_filter,#text_filter,,#text_filter');
          Grid.setInitWidths('*,70,80,70');
          Grid.init();
        end;
    end;
  Meeting.Show;
end;

{ TMeetingForm }

procedure TMeetingForm.DoOnCreate;
begin
  Tabs.addTab('content',strContent,null,0,true,false);
  MeetingGrid := TDHTMLXGrid(Tabs.cells('content').attachGrid(js.new([])));
  MeetingGrid.setHeader('Inhalt,Bearbeiter,Termin,Verantwortlich',',',TJSArray._of([]));
  MeetingGrid.setColumnIds('DESC,USER,DUEDATE,OWNER');
  MeetingGrid.setColTypes('ro,ro,ro,ro');
  MeetingGrid.setInitWidths('*,100,70,100');
  MeetingGrid.enableMultiline(true);
  MeetingGrid.enableAutoWidth(true);
  MeetingGrid.enableKeyboardSupport(true);
  MeetingGrid.init();
  Tabs.addTab('users',strUsers,null,1,false,false);
  UsersGrid := TDHTMLXGrid(Tabs.cells('users').attachGrid(js.new([])));
  UsersGrid.setHeader('Name,Code,Anwesend',',',TJSArray._of([]));
  UsersGrid.setColumnIds('NAME,IDCODE,ACTIVE');
  UsersGrid.setColTypes('edtxt,edtxt,edtxt');
  UsersGrid.init();
end;

procedure TMeetingForm.DoOpen;
var
  i: Integer;
  nEntry: TJSArray;
begin
  if Data.Properties['MEETINGENTRYS'] is TJSObject then
    Meetingentrys := TJSArray(TJSObject(Data.Properties['MEETINGENTRYS']).Properties['Data'])
  else
    Meetingentrys := TJSArray(Data.Properties['MEETINGENTRYS']);
  if Data.Properties['MEETINGUSERS'] is TJSObject then
    Meetingusers := TJSArray(TJSObject(Data.Properties['MEETINGUSERS']).Properties['Data'])
  else
    Meetingusers := TJSArray(Data.Properties['MEETINGUSERS']);
  MeetingGrid.clearAll;
  for i := 0 to Meetingentrys.Length-1 do
    begin
      nEntry := TJSArray.new;
      if Assigned(TJSObject(Meetingentrys[i]).Properties['LINK']) and (copy(string(TJSObject(Meetingentrys[i]).Properties['LINK']),0,8)='PROJECTS') then
        nEntry.push('<b>'+string(TJSObject(Meetingentrys[i]).Properties['DESC'])+'</b>')
      else
        nEntry.push(string(TJSObject(Meetingentrys[i]).Properties['DESC']));
      nEntry.push(TJSObject(Meetingentrys[i]).Properties['USER']);
      nEntry.push(TJSObject(Meetingentrys[i]).Properties['DUEDATE']);
      nEntry.push(TJSObject(Meetingentrys[i]).Properties['OWNER']);
      MeetingGrid.addRow(TJSObject(Meetingentrys[i]).Properties['sql_id'],nEntry);
    end;
  for i := 0 to Meetingusers.Length-1 do
    begin
      nEntry := TJSArray.new;
      nEntry.push(string(TJSObject(Meetingusers[i]).Properties['NAME']));
      nEntry.push(TJSObject(Meetingusers[i]).Properties['IDCODE']);
      nEntry.push(TJSObject(Meetingusers[i]).Properties['ACTIVE']);
      UsersGrid.addRow(TJSObject(Meetingusers[i]).Properties['sql_id'],nEntry);
    end;
end;

procedure TMeetingForm.DoLoadData;
begin
  DoOnCreate;
  DoOpen;
  inherited DoLoadData;
end;

initialization
  if getRight('meetings')>0 then
    RegisterSidebarRoute(strMeeting,'Meeting',@ShowMeetingList);
  Router.RegisterRoute('/meetings/by-id/:Id/',@ShowMeeting);
end.

