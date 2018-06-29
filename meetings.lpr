library meetings;
  uses js, web, classes, Avamm, webrouter, AvammForms, dhtmlx_base,
    dhtmlx_form,SysUtils, Types,dhtmlx_grid;

type

  { TMeetingForm }

  TMeetingForm = class(TAvammForm)
  private
    MeetingGrid,UsersGrid: TDHTMLXGrid;
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
  aForm := TMeetingForm.Create(fmInlineWindow,'Meeting',Params.Values['Id']);
end;
Procedure ShowMeetingList(URl : String; aRoute : TRoute; Params: TStrings);
var
  aParent: TJSHTMLElement;
begin
  if Meeting = nil then
    begin
      aParent := TJSHTMLElement(GetAvammContainer());
      Meeting := TAvammListForm.Create(aParent,'Meeting');
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
  MeetingGrid.setHeader('Inhalt',',',TJSArray._of([]));
  MeetingGrid.setColumnIds('desc');
  MeetingGrid.setColTypes('ro');
  MeetingGrid.enableMultiline(true);
  MeetingGrid.enableAutoWidth(true);
  MeetingGrid.enableKeyboardSupport(true);
  MeetingGrid.init();
  Tabs.addTab('users',strUsers,null,0,false,false);
  UsersGrid := TDHTMLXGrid(Tabs.cells('users').attachGrid(js.new([])));
  UsersGrid.setHeader('Name,Code,Anwesend',',',TJSArray._of([]));
  UsersGrid.setColumnIds('name,idcode,active');
  UsersGrid.setColTypes('edtxt,edtxt,edtxt');
  UsersGrid.init();
end;

procedure TMeetingForm.DoOpen;
begin
end;

procedure TMeetingForm.DoLoadData;
begin
  DoOnCreate;
  DoOpen;
  inherited DoLoadData;
end;

initialization
  if getRight('Meeting')>0 then
    RegisterSidebarRoute(strMeeting,'Meeting',@ShowMeetingList);
  Router.RegisterRoute('/Meeting/by-id/:Id/',@ShowMeeting);
end.

