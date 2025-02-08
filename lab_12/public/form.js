function chgAction(action_name){
    if(action_name=="search"){
        document.forms.searchTheme.action =="/search";
    }else if(action_name="searchArtist"){
        document.forms.searchTheme.action =="/searchArtist";
    }
}