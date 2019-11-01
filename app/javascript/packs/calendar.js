require("jquery")
require("moment")
require("fullcalendar")

function get_events() {
  let results;
  let url = 'calendars/get_events';
  $.ajax({
    url: url,
    type: 'get',
    dataType: 'json',
    async: false,
  })
  .done ((data) => {
    results = data.results
  })
  .fail ((data) =>{
    console.log("fail")
  });

  console.log(results);
  return results;
}

function parse_events(results) {
  let events = [];
  results.forEach( function(result){
    events.push({
      title: result.summary,
      start: result.start,
      end: result.end
    })
  });
  return events;
}

$(document).ready(function(){
  let results = get_events(); // 表示するデータを取得
  let events = parse_events(results); // 表示するデータを fullcalendar用にパース


  $('#calendar').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month agendaWeek agendaDay'
    },
    defaultView:'agendaWeek',
    timeFormat: 'H:mm',
    
    // 表示するイベント
    eventSources: [{events: events}]
  });
});
