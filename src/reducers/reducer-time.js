import moment from 'moment-timezone';
require('es6-object-assign').polyfill();
import {TIME_START} from '../constants';
import {TIME_TICK} from '../constants';
import {TIME_SELECT} from '../constants';
import {TIME_PROCESS} from '../constants';
import {TIME_UPDATE_ALL} from '../constants';
import {TIME_REMOVE} from '../constants';
import {TIME_SHOW_LIST} from '../constants';

let timezones_List = [
  {name:"(GMT -12:00) Eniwetok, Kwajalein",codeName:"Kwajalein"},
  {name:"(GMT -11:00) Midway Island, Samoa",codeName:"Pacific/Midway"},
  {name:"(GMT -10:00) Hawaii",codeName:"US/Hawaii"},
  {name:"(GMT -9:30) Taiohae",codeName:"Pacific/Marquesas"},
  {name:"(GMT -9:00) Alaska",codeName:"US/Alaska"},
  {name:"(GMT -8:00) Pacific Time (US & Canada)",codeName:"US/Pacific"}, //"America/Los_Angeles" //US/Pacific
  //"(GMT -8:00) Pacific Time (US & Canada) (No DST)", //Pacific/Pitcairn
  {name:"(GMT -7:00) Mountain Time (US & Canada)",codeName:"US/Mountain"}, //"America/Denver"  America/Yellowknife //'US/Mountain'
  //"(GMT -7:00) Mountain Time (US & Canada) (No DST)", //"America/Phoenix"
  {name:"(GMT -6:00) Central Time (US & Canada)",codeName:"US/Central"}, //US/Central
  {name:"(GMT -5:00) Eastern Time (US & Canada)",codeName:"US/Eastern"}, //US/Eastern
  //"(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima", //America/Bogota //no dst
  //"(GMT -4:30) Caracas", //America/Caracas  //no dst //not in use since may 1 2016 - was only in venezuela
  {name:"(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz",codeName:"America/Caracas"}, //America/Caracas  //no dst ?
  {name:"(GMT -3:30) Newfoundland",codeName:"Canada/Newfoundland"},
  {name:"(GMT -3:00) Buenos Aires",codeName:"America/Argentina/Buenos_Aires"},
  {name:"(GMT -2:00) De Noronha, South Georgia",codeName:"Atlantic/South_Georgia"},
  {name:"(GMT -1:00) Cape Verde Islands",codeName:'Atlantic/Cape_Verde'},
  {name:"(GMT +0:00) Western Europe Time, London, Lisbon, Dublin",codeName:"Europe/London"},
  {name:"(GMT +1:00) Brussels, Copenhagen, Madrid, Paris",codeName:"Europe/Paris"},
  {name:"(GMT +2:00) Kaliningrad, South Africa",codeName:"Europe/Kaliningrad"},
  {name:"(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg",codeName:"Europe/Moscow"},
  {name:"(GMT +3:30) Tehran",codeName:"Asia/Tehran"},
  {name:"(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi",codeName:"Asia/Baku"},
  {name:"(GMT +4:30) Kabul",codeName:"Asia/Kabul"},
  {name:"(GMT +5:00) Yekaterinburg, Karachi, Tashkent",codeName:"Asia/Karachi"},
  {name:"(GMT +5:30) Mumbai, Kolkata, Chennai, New Delhi",codeName:"Asia/Kolkata"},
  {name:"(GMT +5:45) Kathmandu, Pokhara",codeName:"Asia/Kathmandu"},
  {name:"(GMT +6:00) Almaty, Dhaka",codeName:"Asia/Almaty"},
  {name:"(GMT +6:30) Yangon, Mandalay",codeName:"Asia/Yangon"},
  {name:"(GMT +7:00) Bangkok, Hanoi, Jakarta",codeName:"Asia/Bangkok"},
  {name:"(GMT +8:00) Shanghai, Beijing, Perth, Singapore, Hong Kong",codeName:"Asia/Hong_Kong"},
  {name:"(GMT +8:45) Eucla",codeName:"Australia/Eucla"},
  {name:"(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo",codeName:"Asia/Tokyo"},
  {name:"(GMT +9:30) Adelaide, Broken Hill",codeName:"Australia/Adelaide"},
  {name:"(GMT +10:00) Eastern Australia, Guam, Vladivostok",codeName:"Pacific/Guam"},
  {name:"(GMT +10:30) Lord Howe Island",codeName:"Australia/Lord_Howe"},
  {name:"(GMT +11:00) Solomon Islands, New Caledonia",codeName:"Pacific/Noumea"},
  {name:"(GMT +11:30) Norfolk Island",codeName:"Pacific/Norfolk"},
  {name:"(GMT +12:00) Auckland, Wellington, Fiji",codeName:"Pacific/Auckland"},
  {name:"(GMT +12:45) Chatham Islands",codeName:"Pacific/Chatham"},
  {name:"(GMT +13:00) Apia, Asau",codeName:"Pacific/Apia"},
  {name:"(GMT +14:00) Kiritimati(Line Islands)",codeName:"Pacific/Kiritimati"}
];

let current_Time = moment().format("HH:mm:ss")+ ' ' + moment().format("DD MMM YYYY");

const INITIAL_STATE = {
  current_Time: current_Time,
  timezones_List:timezones_List,
  selected_Timezones:[],
  process_Selected: [],
  showList:false
};



export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TIME_START:
      return Object.assign(
        {},
        state,
        {interval:action.interval}
      );
      break;
    case TIME_TICK:
      return Object.assign(
        {},
        state,
        {current_Time:moment().format("HH:mm:ss")+ ' ' + moment().format("DD MMM YYYY")}
      );
      break;
    case TIME_SELECT:
      clearInterval(state.interval);
      return Object.assign(
        {},
        state,
        { selected_Timezones:state.selected_Timezones.filter(a => a !== action.codeName ).concat( action.codeName ) }
      );
      break;
    case TIME_PROCESS:

      return Object.assign(
        {},
        state,
        { //interval_all:action.interval_all, //the const still gets passed even if i'm not returning it via dispatch ?
          current_Time:moment().format("HH:mm:ss")+ ' ' + moment().format("DD MMM YYYY"), //so the current time gets updated at exactly same time like the others
          process_Selected:state.process_Selected.filter(a => a === 'e').concat( action.processed_times ),
          // interval_all:action.interval_all
        }
      );
      break;
    case TIME_UPDATE_ALL:
      return Object.assign(
        {},
        state,
        {interval_all:action.interval_all}
      );
      break;
    case TIME_REMOVE:
      return Object.assign(
        {},
        state,
        {selected_Timezones:state.selected_Timezones.filter(a=> a!== action.removed) }
      );
    break;
    case TIME_SHOW_LIST:
      return Object.assign(
        {},
        state,
        {showList: !state.showList}
      );
      break;
    default:
      return state;
  }
};
