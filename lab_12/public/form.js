function chgAction(action_name){
    if(action_name=="search"){
        document.forms.search-theme-form.action =="/search";
    }else if(action_name="searchArtist"){
        document.forms.search-theme-form.action =="/searchArtist";
    }
}