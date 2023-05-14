/////////////////////////////////////////////////////////////////////
// script config
const data_network = "https://soldapper.com";
const home = "https://grunts.io";
const cdn = "https://qr.soldapper.com";
/////////////////////////////////////////////////////////////////////
const href = window.location.href;
const parts = href.split('/');
var count_parts = parts.length;
var idleTime = 0;
var sub_dir = "/";
var sub_dir_encoded = "";
var initial_txs = false;
if(sub_dir!=""){sub_dir_encoded=encodeURIComponent(sub_dir);}
/////////////////////////////////////////////////////////////////////
function homeResizer() {
  let flier_height = $("#attr_flier").height();
  let pills_height = $("#pills").height();
  let video_height = $("#promo_video").height();
  let set_height = (flier_height-video_height)/7-1;
  $(".pill").css({"height":set_height+"px","line-height":set_height+"px"});
  $("#right, #left_ul").getNiceScroll().resize();
}
window.onresize = homeResizer;
const configure = fetch(home+sub_dir+"config/config.json?r="+Math.random())
.then((response) => response.json())
.then((confa) => { return confa; });
const init = async () => {
/////////////////////////////////////////////////////////////////////
const a = await configure;
var conf = a;
conf.daps = 0;
conf.sol = 0;
conf.billion = 1000000000;
conf.whitelist_token_status = false;
conf.whitelist_nft_status = false;
conf.notify = false;
conf.countdown = false;
conf.count = null;
// set rank arrays
var master_ranks = conf.ranks;
var officers = master_ranks.slice(0, 10);
var win_ranks = officers.reverse();
var tiers = [];
var shares_ = [0.01,0.03,0.05,0.07,0.09,0.11,0.13,0.15,0.17,0.19];
for (let i = 0; i < win_ranks.length; i++) {
  win_ranks[i] = win_ranks[i].replaceAll(" ","_");
  let item = {};
  item.name = win_ranks[i];
  item.share = shares_[i];
  item.default = shares_[i];
  tiers.push(item);
}
// is native phantom app
let isNative = () => {
  if(/Phantom/i.test(navigator.userAgent)){
    return true;
  }
  else{
    return false;
  }
}
// loading cover
async function cover_in(){
  
}
async function cover_out(){
  $("#cover").fadeOut("500");
}
async function nav_state(id){
  $(".left_li button").removeClass("active");
  $("#"+id).addClass("active");
//   document.title = $("#"+id).html();
//   $("#og_title").attr("content",$("#"+id).html());
  conf.default_page = id;
  if(window.location.pathname.slice(-1) != "/"){
    history.pushState("", "", window.location.pathname+'/#'+id.replace("button_",""));
  }
  else{
    history.pushState("", "", '#'+id.replace("button_",""));
  }
  let deep_link = "https://phantom.app/ul/browse/"+encodeURIComponent(home)+sub_dir_encoded+encodeURIComponent(window.location.hash)+"?ref="+encodeURIComponent(conf.home);
  $("a#deep").attr("href",deep_link);
}
// nav clicks
$(document).delegate(".main_nav", "click", function(e) { 
  let id = $(this).attr("id");
  $("#right").getNiceScroll(0).doScrollTop(0, 100);
  if(id!="button_basics" && id!="main_disconnect" && id!="main_connect"){
    $('#promo_video').get(0).pause();
    $('#promo_video').get(0).currentTime = 0;
  }
  if(id=="button_assets"){
    $(".panel").hide();
    $('*[data-id="button_connect"]').show();
    if(!$('#connect').is(":visible")){
      $('*[data-id="button_assets"]').fadeIn(500);
    }
    $(".content_connect").hide().fadeIn(500);
    nav_state(id);
  }
  else 
  if(id=="button_mint"){
    $(".panel").hide();
    $('*[data-id="button_connect"]').show();
    if(!$('#connect').is(":visible")){
      $('*[data-id="button_mint"]').fadeIn(500);
    }
    $(".content_connect").hide().fadeIn(500);
    nav_state(id);
  }
  else 
  if(id=="button_whitelist"){
    $(".panel").hide();
    $('*[data-id="button_connect"]').show();
    if(!$('#connect').is(":visible")){
      $('*[data-id="button_whitelist"]').fadeIn(500);
    }
    $(".content_connect").hide().fadeIn(500);
    nav_state(id);
  }
  else 
  if(id=="button_winnings"){
    $(".panel").hide();
    $('*[data-id="button_connect"]').show();
    if(!$('#connect').is(":visible")){
      $('*[data-id="button_winnings"]').fadeIn(500);
    }
    $(".content_connect").hide().fadeIn(500);
    nav_state(id);
  }
  else 
  if(id=="button_attributes"){
    $(".panel").hide();
    $('*[data-id="button_attributes"]').fadeIn(500);
    $(".content_connect").hide();
    nav_state(id);
  }
  else 
  if(id=="button_community"){
    $(".panel").hide();
    $('*[data-id="button_community"]').fadeIn(500);
    $(".content_connect").hide();
    nav_state(id);
  }
  else 
  if(id=="button_details"){
    $(".panel").hide();
    $('*[data-id="button_details"]').fadeIn(500);
    $(".content_connect").hide();
    nav_state(id);
  }
  else 
  if(id=="button_basics"){
    $(".panel").hide();
    $('*[data-id="button_basics"]').fadeIn(500);
    $(".content_connect").hide();
    nav_state(id);
    homeResizer();
  }
  else 
  if(id=="button_website"){
    if(isNative()!=false){
      let areyousure = confirm("Are you sure you want to navigate away from the current page?");
      if(areyousure===true){
        window.open(data_network+"/"+conf.alias);
      }
    }
    else{
      window.open(data_network+"/"+conf.alias);
    }
  }
  else 
  if(id=="button_more"){
    if(isNative()!=false){
      let areyousure = confirm("Are you sure you want to navigate away from the current page?");
      if(areyousure===true){
        window.open(data_network+"/listings/contest");
      }
    }
    else{
        window.open(data_network+"/listings/contest");
    }
  }
  else 
  if(id=="button_airdrop"){
    $(".panel").hide();
    $('*[data-id="button_airdrop"]').fadeIn(500);
    $(".content_connect").hide();
    nav_state(id);
  }
  setTimeout(function(){$("#right, #left_ul").getNiceScroll().resize();},500);
});
// share page click
$(document).delegate("#share_deep", "click", function(e) {
  e.preventDefault();
  if (navigator.share) { 
   let share_img = $("#img_b").attr("href");
    navigator.share({
      icon: share_img,
      title: conf.name,
      url: window.location.href
    }).then(() => {
//       ///console.log(window.location.href);
    })
    .catch(console.error);
    } else {
        
    }  
});
// mobile menu open
$(document).delegate("#mobile_menu", "click", function(e) {
  $(this).hide();
  $("#left").stop().animate({
    left: "0px"
  }, 500, function() {
    $("#mobile_close").fadeIn(500);
    $("#right, #left_ul").getNiceScroll().resize();
  });
});
// mobile menu close
$(document).delegate("#mobile_close", "click", function(e) {
  $(this).hide();
  $("#left").stop().animate({
    left: "-500px"
  }, 500, function() {
    $("#mobile_menu").fadeIn(500);
    $("#right, #left_ul").getNiceScroll().resize();
  });
});
// whitelist get links
$(document).delegate(".whitelist_desc a", "click", function(e) {
  e.preventDefault();
  if(isNative()!=false){
    let areyousure = confirm("Are you sure you want to navigate away from the current page?");
    if(areyousure===true){
      window.open($(this).attr("href"));
    }
  }
  else{
    window.open($(this).attr("href"));
  }
});
// grid link clicks
$(document).delegate("ul.grid_item li.grid_img a", "click", function(e) {
  e.preventDefault();
  if(isNative()!=false){
    let areyousure = confirm("Are you sure you want to navigate away from the current page?");
    if(areyousure===true){
      window.open($(this).attr("href"));
    }
  }
  else{
    window.open($(this).attr("href"));
  }
});
// turn winners filter on
$(document).delegate(".filter_off", "click", function(e) {
  $(this).removeClass().addClass("filter_on");
  $("ul.grid_item").each(function(){
    if(!$(this).find(".officer").length){
      $(this).hide();
    }
  });
  $("#right").getNiceScroll().resize();
});
// turn winners filter off
$(document).delegate(".filter_on", "click", function(e) {
  $(this).removeClass().addClass("filter_off");
  $(".grid_item").css({"display":"inline-block"}).show();
  $("#right").getNiceScroll().resize();
});
// basic flier expand
$(document).delegate(".attribute_left img", "click", function(e) {
  let src = $(this).attr("src");
  $("#cover").fadeIn(500);
  $("#cover_message").html("");
  $("#cover").after('<img id="flier_preview" class="animate__animated animate__backInUp" src="'+src+'" />');
});
// basic flier close
$(document).delegate("#flier_preview", "click", function(e) {
  $("#flier_preview").remove();
  $("#cover").fadeOut(500);
});
// rank ordering
function order_rank( a, b ) {
  if ( master_ranks.indexOf(a.rank) < master_ranks.indexOf(b.rank) ){
    return -1;
  }
  if ( master_ranks.indexOf(a.rank) > master_ranks.indexOf(b.rank) ){
    return 1;
  }
  return 0;
}
function order_time( a, b ) {
  if ( a.id < b.id ){
    return 1;
  }
  if (a.id > b.id ){
    return -1;
  }
  return 0;
} 
function order_name( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if (a.name > b.name ){
    return 1;
  }
  return 0;
} 
$(document).delegate(".sort_rank_off, .sort_time_off, .sort_name_off", "click", function(e) {
  let array = [];
  $(".grid_item").each(function(){
    let item = {};
    item.name = $(this).find(".grid_name").html();
    item.rank = $(this).find(".is_title").html();
    item.id = $(this).data("id");
    item.mint = $(this).attr("id");
    if($(this).find(".officer").length==1){
      item.winner = true;
    }
    else{
      item.winner = false;
    }
    array.push(item);
  });
  if($(this).attr("class")=="sort_rank_off"){
    $(".sort_rank_off").removeClass().addClass("sort_rank_on");
    $(".sort_time_on").removeClass().addClass("sort_time_off");
    $(".sort_name_on").removeClass().addClass("sort_name_off");
    array.sort(order_rank);
  }
  else
  if($(this).attr("class")=="sort_time_off"){
    $(".sort_time_off").removeClass().addClass("sort_time_on");
    $(".sort_rank_on").removeClass().addClass("sort_rank_off");
    $(".sort_name_on").removeClass().addClass("sort_name_off");
    array.sort(order_time);
  }
  else
  if($(this).attr("class")=="sort_name_off"){
    $(".sort_name_off").removeClass().addClass("sort_name_on");
    $(".sort_rank_on").removeClass().addClass("sort_rank_off");
    $(".sort_time_on").removeClass().addClass("sort_time_off");
    array.sort(order_name);
  }
  let clones = [];
  for (let i = 0; i < array.length; i++) {
    clones.push($("[data-id='"+array[i].id+"']").clone());
  }
  $(".grid_item").remove();
  for (let i = 0; i < clones.length; i++) {
    $('[data-id="button_assets"]').append(clones[i]);
  }
});
// notification permissions
var noti_status = null;
function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }
  return true;
}
function askNotificationPermission() {
  if(!("Notification" in window)){
    ///console.log("This browser does not support notifications.");
  } 
  else if(checkNotificationPromise()){Notification.requestPermission().then((permission) => {
//     handlePermission(permission);
    conf.notify = permission;
  });} 
  else{Notification.requestPermission((permission) => {
//     handlePermission(permission);
    conf.notify = permission;
  });}
}
// airdrop updates
async function update_airdrop() {
//   console.log(conf.alias);
  // fetch the airdrop data
  const airdropper = fetch(data_network+"/api/airdrop.php?alias="+conf.alias)
  .then((response) => response.json())
  .then((airdrops) => { 
    
    // add unassigned
    $("#unassigned_count").html("("+airdrops.pending.length+")");
    for (let i=0;i<airdrops.pending.length;i++) {
      let item=airdrops.pending[i];
      if(!$('#airdrop_unassigned #airdrop_'+item.id).length){
        let box='<ul id="airdrop_'+item.id+'">';
        let this_img = "";
        this_img = '<li class="air_img"><a target="_blank" href="https://solscan.io/token/'+item.mint+'"><img src="'+item.img+'" /></a></li>';
        box+=this_img+'<li class="air_name">'+item.name+'</li><li class="air_rank">'+item.rank+'</li>';
        box+='</ul>';
        if($("#airdrop_unassigned").html()=="warming up..." || $("#airdrop_unassigned").html()=="nothing to show."){$("#airdrop_unassigned").empty();}
        $("#airdrop_unassigned").append(box);
      }
    }

    // add assigned
    $("#assigned_count").html("("+airdrops.ready.length+")");
    for (let i=0;i<airdrops.ready.length;i++) {
      let item=airdrops.ready[i];
      if(!$('#airdrop_assigned #airdrop_'+item.id).length){
        let box='<ul id="airdrop_'+item.id+'" class="assigned_li">';
        let this_img = "";
        this_img = '<li class="air_img"><a target="_blank" href="https://solscan.io/token/'+item.mint+'"><img src="'+item.img+'" /></a></li>';
        let wallet_ = item.airdrop_to.slice(0, 10);
        let wallet = wallet_+"....."+item.airdrop_to.substr(item.airdrop_to.length - 10);
        box+=this_img+'<li class="air_name">'+item.name+'</li><li class="air_rank">'+item.rank+'</li><li class="air_wallet"><a target="_blank" href="https://solscan.io/account/'+item.airdrop_to+'">'+item.airdrop_handle+'</a></li>';
        box+='</ul>';
        if($("#airdrop_assigned").html()=="warming up..." || $("#airdrop_assigned").html()=="nothing to show."){$("#airdrop_assigned").empty();}
        $("#airdrop_assigned").prepend(box);
        if($('#airdrop_unassigned #airdrop_'+item.id).length){
          $('#airdrop_unassigned #airdrop_'+item.id).remove();
        }
        if($('#airdrop_errors #airdrop_'+item.id).length){
          $('#airdrop_errors #airdrop_'+item.id).remove();
          let fix = $("#errors_count").html();
          fix = fix.replace("(","");
          fix = fix.replace(")","");
          fix = parseInt(fix);
          $("#errors_count").html("("+(fix-1)+")");
        }
      }
    }
    
    // add errors
    $("#errors_count").html("("+airdrops.errors.length+")");
    for (let i=0;i<airdrops.errors.length;i++) {
      let item=airdrops.errors[i];
      if(!$('#airdrop_errors #airdrop_'+item.id).length){
        let box='<ul id="airdrop_'+item.id+'" class="assigned_li">';
        let this_img = "";
        this_img = '<li class="air_img"><a target="_blank" href="https://solscan.io/token/'+item.mint+'"><img src="'+item.img+'" /></a></li>';
        let wallet_ = item.airdrop_to.slice(0, 10);
        let wallet = wallet_+"....."+item.airdrop_to.substr(item.airdrop_to.length - 10);
        box+=this_img+'<li class="air_name">'+item.name+'</li><li class="air_rank">'+item.rank+'</li><li class="air_wallet air_error"><a target="_blank" href="https://solscan.io/tx/'+item.airdrop_sig+'">'+wallet+'</a></li>';
        box+='</ul>';
        if($("#airdrop_errors").html()=="warming up..." || $("#airdrop_errors").html()=="nothing to show."){$("#airdrop_errors").empty();}
        $("#airdrop_errors").prepend(box);
        if($('#airdrop_assigned #airdrop_'+item.id).length){$('#airdrop_assigned #airdrop_'+item.id).remove();}
      }
    }
    
    // add airdropped
    $("#complete_count").html("("+airdrops.complete.length+")");
    for (let i=0;i<airdrops.complete.length;i++) {
      let item=airdrops.complete[i];
      if(!$('#airdrop_complete #airdrop_'+item.id).length){
        let box='<ul id="airdrop_'+item.id+'" class="assigned_li">';
        let this_img = "";
        this_img = '<li class="air_img"><a target="_blank" href="https://solscan.io/token/'+item.mint+'"><img src="'+item.img+'" /></a></li>';
        let wallet_ = item.airdrop_to.slice(0, 10);
        let wallet = wallet_+"....."+item.airdrop_to.substr(item.airdrop_to.length - 10);
        box+=this_img+'<li class="air_name">'+item.name+'</li><li class="air_rank">'+item.rank+'</li><li class="air_wallet air_complete"><a target="_blank" href="https://solscan.io/tx/'+item.airdrop_sig+'">'+item.airdrop_handle+'</a></li>';
        box+='</ul>';
        if($("#airdrop_complete").html()=="warming up..." || $("#airdrop_complete").html()=="nothing to show."){$("#airdrop_complete").empty();}
        $("#airdrop_complete").prepend(box);
        
        if($('#airdrop_assigned #airdrop_'+item.id).length){
          $('#airdrop_assigned #airdrop_'+item.id).remove();
          let fix = $("#assigned_count").html();
          fix = fix.replace("(","");
          fix = fix.replace(")","");
          fix = parseInt(fix);
          $("#assigned_count").html("("+(fix-1)+")");
        }
        
        if($('#airdrop_errors #airdrop_'+item.id).length){
          $('#airdrop_errors #airdrop_'+item.id).remove();
          let fix = $("#errors_count").html();
          fix = fix.replace("(","");
          fix = fix.replace(")","");
          fix = parseInt(fix);
          $("#errors_count").html("("+(fix-1)+")");
        }
        
      }
    }
    
    if($("#airdrop_complete").html()=="" || $("#airdrop_complete").html()=="warming up..."){$("#airdrop_complete").html("nothing to show.")}
    if($("#airdrop_errors").html()=="" || $("#airdrop_errors").html()=="warming up..."){$("#airdrop_errors").html("nothing to show.")}
    if($("#airdrop_assigned").html()=="" || $("#airdrop_assigned").html()=="warming up..."){$("#airdrop_assigned").html("nothing to show.")}
    if($("#airdrop_unassigned").html()=="" || $("#airdrop_unassigned").html()=="warming up..."){$("#airdrop_unassigned").html("nothing to show.")}
    
  });
}
// checks for conf updates
async function conf_updater(){
  // check for config updates
  const checkers = fetch(home+sub_dir+"config/config.json?r="+Math.random())
  .then((response) => response.json())
  .then((checker) => { 
    if(checker.connect!=conf.connect){
      conf.connect=checker.connect;
      if(checker.connect===false){
        $("#disconnect").click();
      }
    }
    if(checker.airdrop!=conf.airdrop){
      conf.airdrop=checker.airdrop;
      if(checker.airdrop===true){
        $("#airdrop_check").show();
      }
      else{
        $("#airdrop_check").hide();
        $("#right, #left_ul").getNiceScroll().resize();
      }
    }
    if(checker.airdrop_total!=conf.airdrop_total){
      conf.airdrop_total=checker.airdrop_total;
    }
    if(checker.drop!=conf.drop){conf.drop=checker.drop;}
    if(checker.max!=conf.max){conf.max=checker.max;}
    if(checker.chain_max!=conf.chain_max){conf.chain_max=checker.chain_max;}
    if(checker.start != conf.start){conf.start=checker.start;}
    if(checker.share!=conf.share){conf.share=checker.share;}
    if(checker.price_multiplier!=conf.price_multiplier){conf.price_multiplier=checker.price_multiplier;}
    if(conf.airdrop===true){
        update_airdrop();
      }
    console.log("airdrop: "+conf.airdrop);
  });
}
var confInterval = setInterval(function(){conf_updater(conf.idle_minutes)}, 10000); // 10 seconds
// idle disconnect
async function timerIncrement(limit) {
  idleTime = idleTime + 1;
  if (idleTime > limit && $("#disconnect").length) {
    $("#disconnect").click();
  }
}
var idleInterval = setInterval(function(){timerIncrement(conf.idle_minutes)}, 60000); // 1 minute
// drop countdown
var countdown = false;
function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? "m " : "m ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
    if(hDisplay!=""){
      hDisplay = Number(hDisplay);
      hDisplay = hDisplay.toLocaleString("en-US")+"h ";
    }
    return hDisplay + mDisplay + sDisplay;
}
function count_down(drop_time) {
    var time = new Date().getTime();
    time = parseInt(time/1000);
    let remaining = drop_time - time;
    var difference = secondsToHms(drop_time-time);
    if($('.content_mint').html()=="Pending Drop" || $('.content_mint').html()=="Ineligible"){
      if(difference == ""){ difference = "Standby..."; }
//       $('*[data-id="button_mint"] .panel_top').html("("+conf.drop_total+" nfts) drop "+conf.drop+" of "+conf.drop_max+" in: "+difference);
      $('*[data-id="button_mint"] .panel_top').html(difference);
      const noti_img = $("#img_b").attr("href");
      if(conf.notify=="granted" && remaining == 1800){
        const text = "NFT Drop in 30 Minutes!";
        const notification = new Notification(conf.name, { body: text, icon: noti_img });
      }
      else if(conf.notify=="granted" && remaining == 1200){
        const text = "NFT Drop in 20 Minutes!";
        const notification = new Notification(conf.name, { body: text, icon: noti_img });
      }
      else if(conf.notify=="granted" && remaining == 600){
        const text = "NFT Drop in 10 Minutes!";
        const notification = new Notification(conf.name, { body: text, icon: noti_img });
      }
      else if(conf.notify=="granted" && remaining == 60){
        const text = "NFT Drop in 1 Minute!";
        const notification = new Notification(conf.name, { body: text, icon: noti_img });
      }
      else if(conf.notify=="granted" && remaining == 0){
        const text = "NFT Drop Live!";
        const notification = new Notification(conf.name, { body: text, icon: noti_img });
      }
    }
    conf.countdown = remaining;
    if (remaining <= 0) { 
      clearInterval(countdown);
    }
}
// wallet provider
let wallet_provider = () => {
  if ("solana" in window) {
    let provider = window.solana;
    if (provider.isPhantom) {
      return provider;
    }
  }
}
// get pda for nft mint
async function getMintPDA(mint){
    let connection = new solanaWeb3.Connection(conf.network, "confirmed");
    let splToken = require("@solana/spl-token");
    let Metadata_ = require("@metaplex-foundation/mpl-token-metadata");
    let Metadata = Metadata_.Metadata;
    let buff = require("buffer");
    let Buffer = buff.Buffer;
    let meta_program_id = new solanaWeb3.PublicKey(conf.METADATA_PROGRAM_ID);
    let meta_mint = new solanaWeb3.PublicKey(mint);
    let MetaPubkey = await solanaWeb3.PublicKey.findProgramAddress(
      [Buffer.from("metadata"), meta_program_id.toBytes(), meta_mint.toBytes()],
      meta_program_id
    )
    .catch(function(err){
      ///console.log("error 3");
    });
    return MetaPubkey[0].toString();
}
async function remove_asset(mint){
  
}
async function add_asset(data,prepend=false){
  var preload_img = new Image();
  preload_img.src = data.data.image;
  let content = '';
  if(!$("#"+data.mint).length){
    let is_officer = "";
    let is_title = "";
    let this_rank = data.data.attributes[1].value;
    if(officers.includes(this_rank.replaceAll(" ","_"))){
      is_officer = '<div class="officer"></div>';
    }
    is_title = '<div class="is_title">'+this_rank+'</div>';
    let is_devnet="";if(conf.network_name=="devnet"){is_devnet="?cluster=devnet";}
    let asset_id = data.name.split("#")[1];
    content += '<ul data-id="'+asset_id+'" id="'+data.mint+'" class="grid_item"><li class="grid_img"><a target="_blank" href="https://solscan.io/token/'+data.mint+is_devnet+'"><img width="200" src="'+data.data.image+'" />'+is_title+'</a></li><li class="grid_name">'+data.data.attributes[0].value+'</li>'+is_officer+'</ul>';
    if(prepend===true){
      $('*[data-id="button_assets"] .panel_top').after(content);
    }
    else{
      $('*[data-id="button_assets"]').append(content);
    }
    setTimeout(function(){
      $("ul#"+data.mint).fadeIn(1500).css({"display":"inline-block"});
      $("#right, #left_ul").getNiceScroll().resize();
    },1500);
  }
}
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
// refresh whitelist
var whitelist_check_timer;
async function whitelist_check(){
let content = '';
if(!$(".content_mint").length){
  content += '<ul class="drop_stats"><li><button disabled class="content_mint">Checking...</button></li></ul>';
  $('*[data-id="button_mint"]').append(content);
}
let connection = new solanaWeb3.Connection(conf.network, "confirmed");
let BN = require("bn.js");
let Buffer_ = require("buffer");
let Buffer = Buffer_.Buffer;
let BufferLayout = require("@solana/buffer-layout");
let splToken = require("@solana/spl-token");
let Metadata_ = require("@metaplex-foundation/mpl-token-metadata");
let Metadata = Metadata_.Metadata;
const publicKey = (property = "publicKey") => {
  return BufferLayout.blob(32, property);
};  
const uint64 = (property = "uint64") => {
  return BufferLayout.blob(8, property);
}; 
const COLLECTION_STATE = BufferLayout.struct([
    BufferLayout.u8("is_initialized"),
    uint64("next_index"),
    uint64("current_max"),
    uint64("current_lamports"),
    uint64("current_start_time"),
    publicKey("collection_mint"),
    publicKey("collection_metadata"),
    publicKey("collection_master_edition"),
]);
let check_1 = true;
let check_2 = true;
let check_3 = true;
let check_4 = true;
let check_5 = true;
// if connected
let provider = wallet_provider();
if(provider.isConnected === true){
let wallet = provider.publicKey;
let wallet_b58 = provider.publicKey.toString();
// let nfts = [];
let amount = null;
let TokenAccounts = await connection.getParsedTokenAccountsByOwner(
wallet, { programId: new solanaWeb3.PublicKey(splToken.TOKEN_PROGRAM_ID) })
.then(function(data) {
  for (let i = 0; i < data.value.length; i++) {
    let token = data.value[i];
    amount = token.account.data.parsed.info.tokenAmount.amount;
    let decimals = token.account.data.parsed.info.tokenAmount.decimals;
    let mint = token.account.data.parsed.info.mint;
    if (amount == 1 && decimals == 0) {}
    else if(mint==conf.WHITELIST_TOKEN){
      if(parseInt(amount) > 0){ conf.whitelist_token_status=true; }
      amount = parseInt(amount);
      conf.daps = amount;
      let amount_ = amount / conf.billion;
      amount_ = amount_.toFixed(5);
      conf.dapper = amount_;
    }
  }
});
if(amount===null){
  conf.daps = 0;
  conf.dapper = "0";
  conf.whitelist_token_status = false;
}

if(conf.USE_WHITELIST_TOKEN===true && conf.daps===0){
  $("#whitelist_token .check_wait").css({"background-position":"right"});
  conf.whitelist_token_status = false;
  check_1 = false;
}
else if(conf.USE_WHITELIST_TOKEN===true && conf.whitelist_token_status===true){
  $("#whitelist_token .check_wait").css({"background-position":"left"});
}
else if(conf.USE_WHITELIST_TOKEN===true){
  $("#whitelist_token .check_wait").css({"background-position":"right"});
  check_1 = false;
}

// get sol balance
let balance = await connection.getBalance(wallet)
.then(function(data) {
  let sol = data / conf.billion;
  sol = sol.toFixed(5);
  conf.sol = sol;
  conf.lamports = data;
  $("#sol_balance").html(sol);
  if(data > 0){
    let tem = data/conf.billion;
    $("#sol_balance").html(tem.toFixed(6));
  }
});
// get collection count

let pda = getMintPDA(conf.address)
.then(function(response){
  let account = new solanaWeb3.PublicKey(response);
  let res = Metadata_.Metadata.fromAccountAddress(connection, account)
  .then(function(meta){
    conf.count = parseInt(meta.collectionDetails.size.toString());
  });
})
.catch(function(err){
  ///console.log(err);
});
if(conf.count===null){
//   ///console.log("returning");
  return;
}
// get collection state data
let collectionFeeAccount = new solanaWeb3.PublicKey(conf.FEE_ACCT);
let collectionMinterProgramId = new solanaWeb3.PublicKey(conf.PROGRAM_ID);
let collectionStatePDA = await solanaWeb3.PublicKey.createWithSeed(
    collectionFeeAccount,
    conf.seed,
    collectionMinterProgramId,
);
let collectionState = null;
await connection.getAccountInfo(collectionStatePDA)
.then(function(response) { 
  collectionState = response; 
}).catch(function(err){
  ///console.log(err);
});
let chain_max = null;
let chain_price = null;
let chain_time = null;
// if (collectionState != null && check_1!==false) {
if (collectionState != null) {
  const encodedCollectionData = collectionState.data;
  const decodedCollectionData = COLLECTION_STATE.decode(encodedCollectionData);
  let is_initialized = decodedCollectionData.is_initialized;
  let next_index = parseInt(new BN(decodedCollectionData.next_index, 10, "le").toString());
  chain_max = parseInt(new BN(decodedCollectionData.current_max, 10, "le").toString());
  chain_price = parseInt(new BN(decodedCollectionData.current_lamports, 10, "le").toString());
  chain_time = parseInt(new BN(decodedCollectionData.current_start_time, 10, "le").toString());
  let current_time = parseInt(Date.now()/1000); 
  
//   ///console.log(conf.count);
//   ///console.log(chain_max);
//   ///console.log(conf.countdown);
  
  // compare the counts
  if(conf.count < chain_max && conf.countdown <= 0){}
  else if(conf.count < chain_max && conf.countdown > 0){
    $(".content_mint").prop("disabled",true).html("Pending Drop");
//     check_5 = false;
  }
  else{
    $(".content_mint").prop("disabled",true).html("Sold Out!");
    $('*[data-id="button_mint"] .panel_top').html("Sold Out!");
    check_3 = false;
  }

  // compare balance
  $("#sol_minimum").html((chain_price+conf.fee)/conf.billion);
  if(conf.lamports > chain_price+conf.fee){
    $("#whitelist_balance .check_wait").css({"background-position":"left"}).removeClass("check_waiting");
  }
  else{
    $("#whitelist_balance .check_wait").css({"background-position":"right"}).removeClass("check_waiting");
    check_4 = false;
  }
  
  if(countdown===false){
    countdown = setInterval(function(){count_down(chain_time);}, 1000);
  }
  
  if(conf.USE_WHITELIST_NFTS===true && conf.whitelist_nft_status===true){
    $("#whitelist_nft .check_wait").css({"background-position":"left"}).removeClass("check_waiting");
  }
  else if(conf.USE_WHITELIST_NFTS===true){
    $("#whitelist_nft .check_wait").css({"background-position":"right"}).removeClass("check_waiting");
    check_2 = false;
  }
  
//   ///console.log(check_1);
//   ///console.log(check_2);
//   ///console.log(check_3);
//   ///console.log(check_4);
//   ///console.log(check_5);
  
  
  // compare mint start time
  if(check_1 === true && check_2 === true && check_3 === true && check_4 === true && check_5 === true){
    if(current_time >= chain_time){
      $(".content_mint").prop("disabled",false).html("Mint");
      $('*[data-id="button_mint"] .panel_top').html(conf.singular+" Minter"); 
    }
    else{
      $('.content_mint').html("Pending Drop");
    }
  }
  else{
    $(".content_mint").prop("disabled",true).html("Ineligible");
//     $('*[data-id="button_mint"] .panel_top').html("Whitelist Requirements!");
  }
  
}
else{
  
  let min_lamps = parseInt($("#sol_minimum").html() * conf.billion);
  if(conf.lamports >= min_lamps){
    $("#whitelist_balance .check_wait").css({"background-position":"left"}).removeClass("check_waiting");
  }
  else{
    $("#whitelist_balance .check_wait").css({"background-position":"right"}).removeClass("check_waiting");
  }
  
  if(conf.USE_WHITELIST_NFTS===true && conf.whitelist_nft_status===true){
    $("#whitelist_nft .check_wait").css({"background-position":"left"}).removeClass("check_waiting");
  }
  else if(conf.USE_WHITELIST_NFTS===true){
    $("#whitelist_nft .check_wait").css({"background-position":"right"}).removeClass("check_waiting");
  }
  
}

  }
}
// connect button click
$(document).delegate("#main_connect, #connect, .content_connect", "click", async function() {
  if(conf.connect===true){
    let provider = wallet_provider();
    if(provider == undefined){
      alert("Phantom Wallet Required!");
      $("#phantom_deeplink").show().addClass("animate__headShake");
      setTimeout(function(){
        $("#phantom_deeplink").show().removeClass("animate__headShake");
      },400);
      return;
    }
    $("#cover").fadeIn(500);
    $("#cover_message").html("Requesting Connectiion...");
    $("#cover").append('<div id="loader" class="loader"></div>');
    if(provider.isConnected == false){
      await window.solana.connect()
      .then(function(){
        $("#cover_message").html("Connecting...");
        provider = wallet_provider();
      })
      .catch(function(err){
        $("#cover_message").html("Canceling Connection...");
        setTimeout(function(){
          cover_out();
          $("#loader").remove();
        },1500);
      });
    }
    if(provider.isConnected === true){
      provider.on('accountChanged',(publicKey) => {if(publicKey){
        $("#cover").show();
        $("#cover_message").html("Changing Wallet...");
        conf.nfts = [];
        $("#main_disconnect").click();
        setTimeout(function(){
          $("#main_connect").click();        
        },2500);
      }});
      $("#main_disconnect").show();
      $("#main_connect").hide();
      $("#main_connect").parent().hide();
      $(".content_connect").remove();
      $("#connect").addClass("animate__animated animate__backOutDown").fadeOut(500);
      let wallet = provider.publicKey;
      let wallet_b58 = provider.publicKey.toString();
      let connection = new solanaWeb3.Connection(conf.network, "confirmed");
      let balance = await connection.getBalance(wallet)
      .then(function(data) {
        let sol = data / conf.billion;
        sol = sol.toFixed(5);
        conf.sol = sol;
        conf.lamports = data;
        let tem = data/conf.billion;
        $("#sol_balance").html(tem.toFixed(6));
        $("#sol_minimum").html((conf.price+conf.fee)/conf.billion);
      });
      let splToken = require("@solana/spl-token");
      const Metadata_ = require("@metaplex-foundation/mpl-token-metadata");
      const Metadata = Metadata_.Metadata;
      let TokenAccounts = await connection.getParsedTokenAccountsByOwner(
      wallet, {
        programId: new solanaWeb3.PublicKey(splToken.TOKEN_PROGRAM_ID)
      })
      .then(function(data) {
        $("#cover_message").html("Preparing Contest...");
        var nfts = [];
        var tokens = [];
        var nfts_ = [];
        var tokens_ = [];
        // separate tokens/nfts/forgets
        for (let i = 0; i < data.value.length; i++) {
          let token = data.value[i];
          let amount = token.account.data.parsed.info.tokenAmount.amount;
          let mint = token.account.data.parsed.info.mint;
          if(amount > 0){
            let ui_amount = token.account.data.parsed.info.tokenAmount.uiAmountString;
            let decimals = token.account.data.parsed.info.tokenAmount.decimals;
            if (amount == 1 && decimals == 0) {
              nfts.push(data.value[i].account.data.parsed.info.mint);
            }
            else if(mint==conf.WHITELIST_TOKEN){
              if(parseInt(amount) > 0){ conf.whitelist_token_status=true; }
              amount = parseInt(amount);
              conf.daps = amount;
              amount = amount / conf.billion;
              amount = amount.toFixed(5);
              conf.dapper = amount;
            }
          }
        }
        // get the additional metadata for each nft
        for (let i = 0; i < nfts.length; i++) {
          let pda = getMintPDA(nfts[i])
          .then(function(response){
            let account = new solanaWeb3.PublicKey(response);
            let res = Metadata_.Metadata.fromAccountAddress(connection, account)
            .then(function(meta){
              if(meta.collection !== undefined && meta.collection.key !== undefined){
                if(meta.collection.key.toString() == conf.WHITELIST_NFTS && conf.USE_WHITELIST_NFTS === true){
                  if(meta.data.name.replace(/\0/g, '')==conf.name+" QR"){
                    conf.whitelist_nft_status = true;
                  }
                }
                if(meta.collection.verified===true && meta.collection.key.toString()===conf.address){
                  let asset = {};
                  asset.name = meta.data.name.replace(/\0/g, '');
                  asset.symbol = meta.data.symbol.replace(/\0/g, '');
                  asset.uri = meta.data.uri.replace(/\0/g, '');
                  asset.mint = meta.mint.toString();
                  asset.data = false;
                  const get_data = fetch(asset.uri)
                  .then((response) => response.json())
                  .then((nft_dat) => {
                  return nft_dat;});
                  const fetch_data = async () => {
                  const b = await get_data;
                    asset.data = b;
                    conf.nfts.push(asset);
                    add_asset(asset);
                  };
                  fetch_data();
                }
              }
            })
            .catch(function(err){
              // ///console.log("Error 3");
            });
          })
          .catch(function(err){
            ///console.log("Error 2");
            ///console.log(err);
          });
        }
        // make sure the grid is done loading before showing more options
        let counter_ = 0;
        var grid_complete = setInterval(function(){
          let counter = $(".grid_item").length;
          if(counter===counter_){
            clearInterval(grid_complete);
            $("#button_filter_winners, #button_sort_rank, #button_sort_time, #button_sort_name, #button_reload_tx").hide().prop("disabled",false).fadeIn(500);
            if(initial_txs === false){
              initial_txs = true;
              setTimeout(function(){
                $("button.is_running").removeClass().addClass("not_running").click();
              },1500);
            }
          }
          else{
            counter_ = counter;
          }
        },2000);
        $(".panel").hide();
        $('*[data-id="'+conf.default_page+'"]').fadeIn(500);
        $(".main_nav").removeClass("active");
        $("#"+conf.default_page).addClass("active");
        whitelist_check();
        whitelist_check_timer = setInterval(function() {whitelist_check();},conf.refresh_rate); 
        cover_out();
        $("#menu").html('<button id="disconnect">Disconnect</button>');
        $("#disconnect").show().addClass("animate__animated animate__fadeInRight");
        $("#right, #left_ul").getNiceScroll().resize();
        $("#button_mint, #button_assets, #button_whitelist, #button_winnings").prop("disabled",false);
      })
      .catch(function(err){
        ///console.log("Error 1");
        ///console.log(err);
      });
    }
    else{
      ///console.log("no good!");
    }
  }
  else{
    alert("Startup Disabled!");
  }
});
// disconnect button
$(document).delegate("#main_disconnect, #disconnect", "click", async function() {
  let provider = wallet_provider();
  provider.request({ method:"disconnect" });
  if(whitelist_check_timer != undefined){clearInterval(whitelist_check_timer);}
  if(countdown != undefined){
    clearInterval(countdown);
    countdown = false;
  }
  conf.nfts = [];
  let new_top = "";
  new_top += '<button disabled id="button_filter_winners" title="Filter Winners" class="filter_off"><span id="show_winners"></span></button>';
  new_top += '<button disabled id="button_sort_rank" title="Order by Rank" class="sort_rank_off"><span id="sort_rank"></span></button>';
  new_top += '<button disabled id="button_sort_time" title="Order by Time" class="sort_time_off"><span id="sort_time"></span></button>';
  new_top += '<button disabled id="button_sort_name" title="Order by Name" class="sort_name_off"><span id="sort_name"></span></button>';
  new_top += '<div class="panel_top">My '+conf.plural+'</div>'
  $('*[data-id="button_assets"]').html(new_top);
  $('*[data-id="button_mint"]').html('<div class="panel_top">Checking...</div>');
  $('.panel').hide();
  $("#disconnect").removeClass().attr("id","connect").html("Connect");
  $("#main_connect").show();
  $("#main_connect").parent().show();
  $("#main_disconnect").hide();
  $('*[data-id="button_connect"]').show().html('<button class="content_connect" style="">Connect</button>');
  $(".content_mint").prop("disabled",false);
  $("#whitelist_balance span.check_wait, #whitelist_nft span.check_wait").addClass("check_waiting");
  $("#whitelist_token span.check_wait").css({"background-position":"right"});
  $("#sol_balance, #sol_minimum").html("0");
  $(".left_li .active").click();
  $("#button_mint, #button_assets, #button_whitelist, #button_winnings, #button_reload_tx").prop("disabled",true);
  conf.tokens = [];
  conf.whitelist_token_status = false;
  conf.whitelist_nft_status = false;
  conf.count = null;
  conf.sol = 0;
  conf.lamports = 0;
  conf.dapper = 0;
  conf.daps = 0;
});
// info button
$(document).delegate("#button_info", "click", async function() {
  $('#promo_video').get(0).pause();
  $('#promo_video').get(0).currentTime = 0;
  if(isNative()!=false){
    let areyousure = confirm("Are you sure you want to navigate away from the current page?");
    if(areyousure===true){
      window.open(data_network+"/post/mint2win");
    }
  }
  else{
    window.open(data_network+"/post/mint2win");
  }
});
// load and reload transactions
$(document).delegate(".not_running", "click", async function() {
  let provider = wallet_provider();
  if(provider.isConnected === true){
  $(this).removeClass().addClass("is_running");
  // get wallet
  let wallet = provider.publicKey.toString();
  // prepare mints array
  let mints = [];
  var winning_ranks = win_ranks
  for (let i = 0; i < conf.nfts.length; i++) {
      let item = {};
      item.mint = conf.nfts[i].mint;
      let rank = conf.nfts[i].data.attributes[1].value;
      rank = rank.replaceAll(" ","_");
      if(winning_ranks.includes(rank)){mints.push(conf.nfts[i].mint);}
  }
  if(mints.length < 1){
    $("#button_reload_tx").removeClass().addClass("not_running");
    return;
  }
  mints = encodeURIComponent(JSON.stringify(mints));
  // fetch transactions
  let request = data_network+"/api/get_transactions.php?alias="+conf.alias+"&wallet="+wallet+"&mints="+mints;
    $.getJSON(request)
    .done(function(response) {
      // loop through each round and make a parent element
      let rounds = Object.keys(response);
      let content = "";
      for (let i = 0; i < rounds.length; i++) {
        content += '<div class="tx_wrapper" data-id="'+rounds[i]+'" id="tx_round_'+i+'"><div class="tx_round_title"><span class="round_sol">SOL</span><span class="round_total">0</span><span class="round_grey">Round:</span> '+rounds[i]+'</div></div>';
      }
      $("#txs").html(content);
      $(".tx_wrapper").each(function(){
        let id = $(this).data("id");
        let txs = response[id];
        let tx_rows = "";
        $("#tx_round_"+id).fadeIn(400);
        let total = 0;
        for (let t = 0; t < txs.length; t++) {
          let amount = txs[t].amount / conf.billion;
          total = total + amount
          amount = amount.toFixed(5);
          tx_rows += '<ul class="tx_row animate__animated animate__zoomIn" id="tx_row_'+txs[t].id+'"><li class="tx_amount"><span class="sol_amount">'+amount+'</span> <span class="sol_purple sol_pad">SOL</span></li><li class="tx_mint"><a target="_blank" href="https://solscan.io/tx/'+txs[t].signature+'">'+txs[t].mint+'</a></li></ul>';
        }
        $("#tx_round_"+id).append(tx_rows);
        $("#tx_round_"+id).find(".round_total").html(total.toFixed(5));
      });
      $("#right").getNiceScroll().resize();
    })
    .fail(function(err) {
      console.log("Error:",err.statusText);
    })
    .always(function() {
      setTimeout(function(){
        $("#button_reload_tx").removeClass().addClass("not_running");
      },1000);
      console.log("Done");
    });  
  }
});
// mint nft
$(document).delegate(".content_mint", "click", async function() {
  let provider = wallet_provider();
  $(this).attr("disabled",true);
  $("#cover").fadeIn(500);
  $("#cover_message").html("Connecting...");
  $("#loader").remove();
  $("#cover").append('<div id="loader" class="loader"></div>');
  if(provider.isConnected === false){
      await window.solana.connect();
      provider = wallet_provider();
  }
  if(provider.isConnected === true){
      $("#cover_message").html("Preparing Transaction...");
      if(conf.USE_WHITELIST_NFTS===true && conf.whitelist_nft_status===false){
        alert("nft whitelist failure");
      }
      else if(conf.USE_WHITELIST_TOKEN===true && conf.whitelist_token_status===false){
        alert("token whitelist failure");
      }
      else{
        
        let wallet = provider.publicKey;
        let wallet_b58 = provider.publicKey.toString();
        ///console.log("User Wallet: "+wallet_b58);
        
        let connection = new solanaWeb3.Connection(conf.network, "confirmed");
        let Buffer_ = require("buffer");
        let Buffer = Buffer_.Buffer;
        let BufferLayout = require("@solana/buffer-layout");
        let BN = require("bn.js");
        let splToken = require("@solana/spl-token");
        let Metadata_ = require("@metaplex-foundation/mpl-token-metadata");
        let Metadata = Metadata_.Metadata;
        
        let nftMinterProgramId = new solanaWeb3.PublicKey(conf.PROGRAM_ID);
        let nftFeeAccount = new solanaWeb3.PublicKey(conf.FEE_ACCT);
        let metadataProgramId = new solanaWeb3.PublicKey(conf.METADATA_PROGRAM_ID);
        let dapperMint = new solanaWeb3.PublicKey(conf.WHITELIST_TOKEN);
        let fee_lamports = conf.price;
        
        const publicKey = (property = "publicKey") => {
          return BufferLayout.blob(32, property);
        };  
        const uint64 = (property = "uint64") => {
          return BufferLayout.blob(8, property);
        };  
        
        const NFT_STATE = BufferLayout.struct([
          BufferLayout.u8("is_initialized"),
          uint64("next_index"),
          uint64("current_max"),
          uint64("current_lamports"),
          uint64("current_start_time"),
          BufferLayout.u8("current_percentage"),
          publicKey("collection_mint"),
          publicKey("collection_metadata"),
          publicKey("collection_master_edition"),
        ]);
        
        let mintAuthorityPDA = await solanaWeb3.PublicKey.findProgramAddress(
        [Buffer.from("mint_authority")],
        nftMinterProgramId
        );
        ///console.log("Mint Authority PDA: ", mintAuthorityPDA[0].toString());
        
        const mintAccount = new solanaWeb3.Account();
        ///console.log("mintAcccount: ", mintAccount.publicKey.toString());
        const minRent = await connection.getMinimumBalanceForRentExemption(splToken.MintLayout.span, 'singleGossip');
        ///console.log("minRent: ", minRent);
        const createMintAccountTx = solanaWeb3.SystemProgram.createAccount({
            programId: splToken.TOKEN_PROGRAM_ID,
            space: splToken.MintLayout.span,
            lamports: minRent,
            fromPubkey: provider.publicKey,
            newAccountPubkey: mintAccount.publicKey,
        });
        ///console.log("Create Mint Account Tx: ", createMintAccountTx);
        let collectionMintAccount = mintAccount.publicKey;
        
        const initializeMintTx = splToken.createInitializeMintInstruction(
          mintAccount.publicKey,
          0,
          mintAuthorityPDA[0],
          mintAuthorityPDA[0],
          splToken.TOKEN_PROGRAM_ID,
        );
        ///console.log("Initialize Mint Tx: ", initializeMintTx);
        
        const associatedTokenAccount = await splToken.getAssociatedTokenAddress(
            mintAccount.publicKey,
            provider.publicKey,
            false,
            splToken.TOKEN_PROGRAM_ID,
            splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
        );        
        ///console.log("Associated Token Account: ", associatedTokenAccount.toString());
        
        const createATATx = splToken.createAssociatedTokenAccountInstruction(
            provider.publicKey,
            associatedTokenAccount,
            provider.publicKey,
            mintAccount.publicKey,
            splToken.TOKEN_PROGRAM_ID,
            splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
        )
        ///console.log("Create ATA Tx: ", createATATx);
        
        let metadataAccount = await solanaWeb3.PublicKey.findProgramAddress(
            [Buffer.from("metadata"), metadataProgramId.toBytes(), mintAccount.publicKey.toBytes()],
            metadataProgramId
        );
        ///console.log("Metadata PDA: ", metadataAccount[0].toString());
        let collectionMetadataAccount = metadataAccount[0];

        const metadataRent = await connection.getMinimumBalanceForRentExemption(679, 'singleGossip');
        ///console.log("metadataRent: ", metadataRent);
        const fundMetadataTx = solanaWeb3.SystemProgram.transfer({
            fromPubkey: provider.publicKey,
            lamports: metadataRent,
            toPubkey: collectionMetadataAccount,
        });
        ///console.log("Fund Metadata Acccount Tx: ", fundMetadataTx);        
        
        let masterEditionAccount = await solanaWeb3.PublicKey.findProgramAddress(
            [Buffer.from("metadata"), metadataProgramId.toBytes(), mintAccount.publicKey.toBytes(), Buffer.from("edition")],
            metadataProgramId
        );
        ///console.log("Master Edition PDA: ", masterEditionAccount[0].toString());
        let collectionMasterEditionAccount = masterEditionAccount[0];        
        
        let nftStatePDA = await solanaWeb3.PublicKey.createWithSeed(
            nftFeeAccount,
            conf.seed,
            nftMinterProgramId,
        );
        ///console.log("NFT State PDA: ", nftStatePDA.toString());
        let nftState = null;
        await connection.getAccountInfo(nftStatePDA)
        .then(function(response) {
          ///console.log("nftStatePDA");
          ///console.log(response);
          nftState = response;
        })
        .catch(function(error) {
          let errorz = JSON.stringify(error);
          errorz = JSON.parse(errorz);
          ///console.log("Error: ", error);
          return;
        });
        
        let createNftStateTx = null;
        if (nftState != null) {
          const encodedNftData = nftState.data;
          const decodedNftData = NFT_STATE.decode(encodedNftData);
          ///console.log("nfttState - is_initialized: ", decodedNftData.is_initialized);
          ///console.log("nfttState - next_index", new BN(decodedNftData.next_index, 10, "le").toString());
          ///console.log("nfttState - current_max", new BN(decodedNftData.current_max, 10, "le").toString());
          ///console.log("nfttState - current_lamports", new BN(decodedNftData.current_lamports, 10, "le").toString());
          ///console.log("nfttState - current_start_time", new BN(decodedNftData.current_start_time, 10, "le").toString());
          collectionMintAccount = new solanaWeb3.PublicKey(decodedNftData.collection_mint);
          collectionMetadataAccount = new solanaWeb3.PublicKey(decodedNftData.collection_metadata);
          collectionMasterEditionAccount = new solanaWeb3.PublicKey(decodedNftData.collection_master_edition);
        }        
        
        ///console.log("nftState - collectionMintAccount", collectionMintAccount.toString());
        ///console.log("nftState - collectionMetadataAccount", collectionMetadataAccount.toString());
        ///console.log("nftState - collectionMasterEditionAccount", collectionMasterEditionAccount.toString());
        
        const tempFeeAccount = new solanaWeb3.Account();
        ///console.log("Temp Fee Account: ", tempFeeAccount.publicKey.toString());
        const createTempFeeAccountTx = solanaWeb3.SystemProgram.createAccount({
            programId: nftMinterProgramId,
            space: 0,
            lamports: fee_lamports,
            fromPubkey: provider.publicKey,
            newAccountPubkey: tempFeeAccount.publicKey,
        });
        ///console.log("Create Temp Fee Account Tx: ", createTempFeeAccountTx);      
        
        const dapperATA = await splToken.getAssociatedTokenAddress(
            dapperMint,
            provider.publicKey,
            false,
            splToken.TOKEN_PROGRAM_ID,
            splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
        );
        ///console.log("Dapper Associated Token Account: ", dapperATA.toString());        
        
        var uarray = new Uint8Array(1);
        let counter = 0;    
        uarray[counter++] = 0; // 0 = {grunt}_minter MintNFT instruction
        ///console.log("Data: ", uarray);        
        let contestKey = new solanaWeb3.PublicKey(conf.contest_wallet);
        const nftMintTx = new solanaWeb3.TransactionInstruction({
            programId: nftMinterProgramId,
            data: Buffer.from(uarray),
            keys: [
                { pubkey: provider.publicKey, isSigner: true, isWritable: true }, // 0
                { pubkey: nftStatePDA, isSigner: false, isWritable: true }, // 1
                { pubkey: mintAuthorityPDA[0], isSigner: false, isWritable: false }, // 2
                { pubkey: splToken.TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // 3
                { pubkey: mintAccount.publicKey, isSigner: true, isWritable: true }, // 4
                { pubkey: associatedTokenAccount, isSigner: false, isWritable: true }, // 5
                { pubkey: metadataProgramId, isSigner: false, isWritable: false }, // 6
                { pubkey: metadataAccount[0], isSigner: false, isWritable: true }, // 7
                { pubkey: masterEditionAccount[0], isSigner: false, isWritable: true }, // 8
                { pubkey: solanaWeb3.SystemProgram.programId, isSigner: false, isWritable: false }, // 9
                { pubkey: solanaWeb3.SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false }, // 10
                { pubkey: collectionMintAccount, isSigner: false, isWritable: false }, // 11
                { pubkey: collectionMetadataAccount, isSigner: false, isWritable: true }, // 12
                { pubkey: collectionMasterEditionAccount, isSigner: false, isWritable: true }, // 13
                { pubkey: tempFeeAccount.publicKey, isSigner: true, isWritable: true }, // 14
                { pubkey: nftFeeAccount, isSigner: false, isWritable: true }, // 15
                { pubkey: dapperATA, isSigner: false, isWritable: false }, // 16
                { pubkey: contestKey, isSigner: false, isWritable: true }, // 17
            ],        
        });
        ///console.log("NFT Mint Tx: ", nftMintTx);        
        let tx = new solanaWeb3.Transaction();
        if (nftState != null) {        
        tx.add(createMintAccountTx, initializeMintTx, createATATx, fundMetadataTx, createTempFeeAccountTx, nftMintTx);
        tx.recentBlockhash = (await connection.getRecentBlockhash('confirmed')).blockhash;
          
        ///console.log("Blockhash: "+tx.recentBlockhash);
          
        tx.feePayer = provider.publicKey;
        ///console.log("Start Tx");
        $("#cover_message").html("Requesting Approval...");
        /////////////////////////////////////////////////////////////////////////////////
        
        try {
        
          let signedTransaction = await provider.signTransaction(tx);
          signedTransaction.partialSign(mintAccount);
          signedTransaction.partialSign(tempFeeAccount);
          ///console.log("Tx: ", tx);
          const serializedTransaction = signedTransaction.serialize();
          $("#cover_message").html("Sending Transaction...");
          const signature = await connection.sendRawTransaction(
              serializedTransaction,
              { skipPreflight: false, preflightCommitment: 'confirmed' },
          );        
          console.log("Signature: ", signature);
          console.log("Finalizing...");
          
          $("#cover_message").html("Finalizing Transaction...");
          
          const intervalID = setInterval(async function(){
          let tx_status = await connection.getSignatureStatuses([signature], { searchTransactionHistory: true,});
            if( tx_status.value[0].confirmationStatus == undefined ){
              ///console.log("Bad Status...");
              // clearInterval(intervalID);
            }
            else if( tx_status.value[0].confirmationStatus == "finalized" ){
              clearInterval(intervalID);
              $("#cover_message").html("Looking Good...");
              
              setTimeout(() => { $("#cover_message").html("Almost Done..."); }, 2000);
              
              const tx_data = await connection.getTransaction(signature);
              const tx_mint = tx_data.meta.postTokenBalances[0].mint;
              
              // process the signature at the cdn
              setTimeout(() => { 
                process_signature(conf.alias,signature,home,tx_mint)
                .catch(function(err){
                  $("#cover_message").html("Trying Again...");
                  console.log("Retrying...");
                  setTimeout(() => { 
                    process_signature(conf.alias,signature,home,tx_mint)
                    .catch(function(err){
                      alert("Metadata Error! \nPlease copy the signature and report it to SolDapper.");
                      $("#cover_message").html(signature);
                      $("#loader").fadeOut(500);
                    }); }, 3000);
                });
              }, 5000);
              
            }
          }, 3000);        

        } 
        catch(error) {
          ///console.log("Error: ", error);
          let errorz = JSON.stringify(error);
          errorz = JSON.parse(errorz);
          ///console.log("Error Logs: ", error);
          let known_error = false;
          if(errorz.code!=undefined && errorz.message!=undefined){
            known_error = true;
            $("#cover_message").html(errorz.message);
          }
          else{
            for (let i = 0; i < errorz.logs.length; i++) {
              let text = errorz.logs[i];
              if(text.includes("CERROR:")){
                known_error = true;
                text = text.split("CERROR:");
                text = text[1].trim();
                $("#cover_message").html(text+"!");
                if(text=="Sold Out"){
                  $(".content_mint").attr("disabled",true);
                  $('*[data-id="button_mint"] .panel_top').html(text+"!");
                }
                known_error = true;
              }
            }
          }
          if(known_error===false){
            $("#cover_message").html("Oops, Unknown Error!");
          }
          $("#loader").fadeOut(500);
          $(".content_mint").prop("disabled",false);
          setTimeout(function(){
            cover_out();
            $("#loader").remove();
          },2000);
        }   
        /////////////////////////////////////////////////////////////////////////////////
        } 
        else {
          $("#cover_message").html("Error!");
          ///console.log("NFT State Error");
        }
      }
    }   
});
async function process_signature(alias,signature,home,mint){
  //console.log("NFT Mint", tx_mint);
  $.getJSON(data_network+"/api/process_mint.php?alias="+alias+"&signature="+signature+"&config="+encodeURI(home))
  .done(function(response) {
      console.log("Metadata Status");
      if(response.status !== undefined && response.status === "ok"){
        let obj = {};
        obj.name = response.data.name;
        obj.symbol = response.data.symbol;
        obj.uri = cdn+"/"+conf.alias+"/"+response.id;
        obj.mint = mint;
        obj.data = response.data;
        conf.nfts.push(obj);
        $(".sort_rank_on, .sort_time_on, .sort_name_on")
        $(".filter_on").click();
        add_asset(obj,true);
        $("#cover_message").html("Successful Mint!");
        console.log("Successful Mint!");
        $("#button_assets").click();
        $(".content_mint").attr("disabled",false);
        setTimeout(function(){
          $("#loader").fadeOut(500);
          cover_out();
          setTimeout(function(){
            $("#loader").remove();
          },1000);
        },1500);
      }
      else if(response !== undefined && response === "generation error"){
        alert("Metadata Error! \nPlease copy the signature and report it to SolDapper.");
        $("#cover_message").html(signature);
        $("#loader").fadeOut(500);
      }
      else{
        alert("Unknown Error! \nPlease copy the signature and report it to SolDapper.");
        $("#cover_message").html(signature);
        $("#loader").fadeOut(500);
      }
  })
  .fail(function(err) {
    console.log(alias,signature,home,mint);
//     process_signature(alias,signature,home,mint);
  }).always(function() {
    console.log("Complete");
  });
}
// details sub panel change
$(document).on('change', '#details_select', function() {
  $(".sub_panel").hide();
  $("#"+$(this).val()).fadeIn(500);
  $("#right").getNiceScroll().resize();
});
// solana button click
$(document).delegate("#button_network", "click", async function() {
    if(isNative()!=false){
      let areyousure = confirm("Are you sure you want to navigate away from the current page?");
      if(areyousure===true){
        window.open("https://solana.com");
      }
    }
    else{
      window.open("https://solana.com");
    }
});
// round ticker click
$(document).delegate("#round_ticker", "click", async function() {
  $('#details_select option:eq(1)').prop('selected', true);
  $(".sub_panel").hide();
  $("#round_status").show();
  $("#button_details").click();
});
// dom ready
$(document).ready(function() { 
  if(window.location.hash) { conf.default_page = window.location.hash.replace("#","button_"); }
  $(this).mousemove(function (e) {idleTime = 1;});
  $(this).keypress(function (e) {idleTime = 1;});
  setTimeout(function(){
    cover_out();
    $("#background").addClass("background");
    $("#app").show();
    setTimeout(function(){
      $("#logo").css({"width":"100px","height":"100px"}).addClass("animate__animated animate__backInUp");
      $("#connect").show().addClass("animate__animated animate__backInUp");
      setTimeout(function(){
        $("#collection_name, #collection_symbol").show().addClass("animate__animated animate__fadeInRight");
        $("#content").show().addClass("animate__animated animate__slideInUp");
        setTimeout(function(){
          $("#loader").fadeOut(400);
          $("#"+conf.default_page).click();
          $("#button_mint, #button_assets, #button_whitelist, #button_winnings").prop("disabled",true);
          homeResizer();
            setTimeout(function(){
              $("#loader").remove();
                $("#round_ticker").show().addClass("animate__animated animate__fadeInDown");
                askNotificationPermission();
            },1000);
        },1000);
      },1000);
    },1800);
  },4000);
  $("#connect").hide();
  $("#background").css({"background-image":"url("+conf.background+")"});
  $("#logo").css({"background-image":"url("+conf.logo+")"});
  $("#img_a").attr("content",conf.logo);
  $("#img_b,#img_c").attr("href",conf.logo);
  $("title, #collection_name").html(conf.name);
  $("meta[property='og:title']").attr("content", conf.name);
  $("#collection_symbol").html("<span id='description'>("+conf.symbol+") "+conf.description+"</span>");
  $("#button_assets").html("My "+conf.plural);
  $("#button_mint").html("Mint "+conf.plural);
  $('*[data-id="button_assets"] .panel_top').html("My "+conf.plural);
  $("#qr_show_me").attr("href",data_network+"/"+conf.alias);
  $("#airdrop_total").html(conf.airdrop_total);
  $("#airdrop_singular").html(conf.singular);
  $("#airdrop_qr").attr("href",data_network+"/"+conf.alias);
  $("#airdrop_daps").html((conf.airdrop_daps/conf.billion));
//   $("#airdrop_daps").html((conf.airdrop_daps/conf.billion).toFixed(5));
  if(conf.airdrop===true){
    $("#airdrop_check").fadeIn(500);
  }
  for (let i = 0; i < conf.community.length; i++) {
    let community = conf.community[i];
    let item = '<div class="community"><img src="'+sub_dir+community.image+'" /><a target="_blank" href="'+community.url+'">'+community.name+'</a></div>';
    $('*[data-id="button_community"]').append(item);
  }
  $("#right, #left_ul").niceScroll({
    cursorcolor: "#f1f1f1",
    cursoropacitymin: 1,
    cursoropacitymax: 1,
    cursorwidth: "8px",
    cursorborder: 0,
    cursorborderradius: "8px",
    zindex: 4,
    autohidemode: false,
    bouncescroll: false,
    horizrailenabled: false,
    railalign: "right"
  });
  let deep_link = "https://phantom.app/ul/browse/"+encodeURIComponent(home)+sub_dir_encoded+encodeURIComponent(window.location.hash)+"?ref="+encodeURIComponent(conf.home);
  $("a#deep").attr("href",deep_link);
  if(isNative()!=false){ 
    $("#phantom_deeplink, #share_page").remove();
    $("#button_network").addClass("native");
  }
  if(conf.network_name=="devnet"){
    $("#button_network").html("Solana Devnet").addClass(conf.network_name);
  }
  else if(conf.network_name=="mainnetbeta"){
    $("#button_network").html("Solana Mainnet Beta").addClass(conf.network_name);
  }
  
  // set the custom rank titles
  let i = 0;
  $(".rank_title").each(function(){
    $(this).html((i+1)+". "+conf.ranks[i]);
    i++;
  });
  
  // rarity interval
  async function update_rarity() {
    if(conf.connect===true){
    
    // display mint totals
    $.getJSON(data_network+"/api/contest_stats.php?alias="+conf.alias, function( stats ) {
    
    let available = conf.chain_max - stats.count;
    $("#rare_available").val(available);
    if(available > 0){
      if((Date.now()/1000)>conf.start){
        $("#rare_status").val("Active");
        $("#round_ticker").html("<span class='ticker_title'>Round:</span> "+conf.drop+" <span class='ticker_active'> Active</span>");
      }
      else{
        $("#rare_status").val("Pending Drop");
        $("#round_ticker").html("<span class='ticker_title'>Round:</span> "+conf.drop+" <span class='ticker_pending'> Pending Drop</span>");     
      }
    }
    else{
      $("#rare_status").val("Complete");
      $("#round_ticker").html("<span class='ticker_title'>Round:</span> "+conf.drop+" <span class='ticker_complete'> Complete</span>");
    }
    
    stats = stats.stats;
    $(".rare_total").each(function(){
      let id = $(this).attr("id");
      let this_count = stats[id.replace("rare_","")];
      $(this).val(this_count);
      if(this_count==0){
         $("#"+id+"_commission").val("0 SOL");
      }
    });
    
    $(".up_arrow, .down_arrow").remove();
    
    // roll up winnings
    for (let i = 0; i < tiers.length; i++) {
    let tier = tiers[i];
    tiers[i].direction = "";
    let tier_element = "rare_"+tier.name;
    let tier_ = $("#"+tier_element);
      if(tier_.val()==0){
        if(i==(tiers.length-1)){}
        else{
          let roll_share = tiers[i+1].share + tiers[i].share;
          tiers[i+1].share = roll_share;
          tiers[i].share = 0;
          tiers[i].direction = JSON.stringify('<img class="up_arrow" src="/img/arrow-up.svg" /> ');
        }
      }
    } 
    
    // roll down winnings
    tiers.reverse();
    let rolldown = 0;
    for (let i = 0; i < tiers.length; i++) {
    let tier = tiers[i];
    let tier_element = "rare_"+tier.name;
    let tier_ = $("#"+tier_element);
      if(tier_.val() == 0 && i == 0 && tiers[i].share == 1){
        tiers[i].share = tier.share + rolldown;
        i = tiers.length;
        return;
      }
      else if(tier_.val() == 0){
        rolldown = rolldown + tiers[i].share;
        tiers[i].share = 0;
        tiers[i].direction = JSON.stringify('<img class="down_arrow" src="/img/arrow-down.svg" /> ');
      }
      else{
        tiers[i].share = tiers[i].share + rolldown;
        i = tiers.length;
      }
    }
    tiers.reverse();
          
    // display rank shares
    for (let i = 0; i < tiers.length; i++) {
      let tier = tiers[i];
      let head = $("#rare_"+tier.name).parent().parent().prev("div");
      if(tiers[i].direction != ""){
        head.prepend(JSON.parse(tiers[i].direction));
      }
      $("#rare_"+tier.name+"_share").val((tier.share*100).toFixed(2)+"%");
      let this_count = parseInt($("#rare_"+tier.name).val());
      let prize_each = false;
      if(tier.share != 0){
        if(this_count == 0){
          prize_each = this_count;
        }
        else{
          let now_balance = $("#rare_expected").val();
          now_balance = parseInt(now_balance.replace(" SOL",""));
          prize_each = now_balance*conf.billion*tier.share;
          prize_each = prize_each/this_count;
          prize_each = (prize_each/conf.billion).toFixed(2);
        }
        $("#rare_"+tier.name+"_commission").val(prize_each+" SOL");
      }
    }
        
    }); 
    
    // round details
    $("#rare_round").val(conf.drop);
    $("#rare_share").val((conf.share*100)+"%");
    $("#rare_round_max").val(conf.max);
    $("#rare_fee").val((conf.price/conf.billion).toFixed(2)+" SOL");
    $("#rare_next_fee").val((conf.price/conf.billion*conf.price_multiplier).toFixed(2)+" SOL");
    
    // prize details
    $("#rare_address").val(conf.contest_wallet);
    let connection = new solanaWeb3.Connection(conf.network, "confirmed");
    let prize_wallet = new solanaWeb3.PublicKey(conf.contest_wallet);
    let get_balance = await connection.getBalance(prize_wallet)
    .then(function(data) {
      let lamports = data;
      lamports = lamports - conf.billion;
      let sol = lamports / conf.billion;
      sol = sol.toFixed(2);
      $("#rare_balance").val(sol+" SOL");
      let rare_adjusted = ( conf.max * conf.price / conf.billion * conf.share );      
      $("#rare_expected").val( rare_adjusted.toFixed(2) + " SOL" );
    });
    
    $.getJSON(data_network+"/api/exchangerate.php", function( rate ) {
      $("#rare_usd").val( ( ( conf.share * conf.max * conf.price / conf.billion ) * rate ).toFixed(2) + " USD" );
    });
    
  }
  }
  update_rarity();
  var rarityInterval = setInterval(function(){update_rarity();}, 20000); // 20 seconds

  
});
/////////////////////////////////////////////////////////////////////
};
init();
/////////////////////////////////////////////////////////////////////
