library meetings;
  uses js, web, classes, Avamm, webrouter, AvammForms, dhtmlx_base,
    dhtmlx_form,SysUtils, Types;

type

  TMeetingForm = class(TAvammForm)
  end;

resourcestring
  strMeeting             = 'Besprechungen';

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

initialization
  if getRight('Meeting')>0 then
    RegisterSidebarRoute(strMeeting,'Meeting',@ShowMeetingList);
  Router.RegisterRoute('/Meeting/by-id/:Id/',@ShowMeeting);
end.

