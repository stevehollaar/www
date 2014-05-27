this["Templates"] = this["Templates"] || {};
this["Templates"]["DashboardPageView"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });;
this["Templates"] = this["Templates"] || {};
this["Templates"]["DashboardSection"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "";


  return buffer;
  });;
this["Templates"] = this["Templates"] || {};
this["Templates"]["FoursquareCheckinInfoWindow"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<div class=\"info-window\">\n    <h4>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.venue)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " <span class=\"time\">";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatSecondsDate || (depth0 && depth0.formatSecondsDate)),stack1 ? stack1.call(depth0, (depth0 && depth0.createdAt), "timeOnly", options) : helperMissing.call(depth0, "formatSecondsDate", (depth0 && depth0.createdAt), "timeOnly", options)))
    + "</span></h4>\n    <p>"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.venue)),stack1 == null || stack1 === false ? stack1 : stack1.beenHere)),stack1 == null || stack1 === false ? stack1 : stack1.count)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " checkin";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.pluralize || (depth0 && depth0.pluralize)),stack1 ? stack1.call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.venue)),stack1 == null || stack1 === false ? stack1 : stack1.beenHere)),stack1 == null || stack1 === false ? stack1 : stack1.count), options) : helperMissing.call(depth0, "pluralize", ((stack1 = ((stack1 = (depth0 && depth0.venue)),stack1 == null || stack1 === false ? stack1 : stack1.beenHere)),stack1 == null || stack1 === false ? stack1 : stack1.count), options)))
    + " here</p>\n</div>";
  return buffer;
  });;
this["Templates"] = this["Templates"] || {};
this["Templates"]["FoursquareCheckins"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2;
  buffer += "\n    <div class=\"col-sm-5 checkins-container\">\n        <h2>checked in to "
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.checkins)),stack1 == null || stack1 === false ? stack1 : stack1.length)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + " place";
  stack2 = helpers.unless.call(depth0, (depth0 && depth0.singleCheckin), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "</h2>\n        <ul class=\"checkins\">\n            ";
  stack2 = helpers.each.call(depth0, (depth0 && depth0.checkins), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        </ul>\n    </div>\n    <div class=\"col-sm-7 map-container\">\n        <div class=\"map\"></div>\n    </div>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  
  return "s";
  }

function program4(depth0,data) {
  
  var buffer = "", stack1, stack2, options;
  buffer += "\n                <li data-id=\"";
  if (stack1 = helpers.id) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.id); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">\n                    ";
  stack2 = helpers['if'].call(depth0, ((stack1 = ((stack1 = (depth0 && depth0.venue)),stack1 == null || stack1 === false ? stack1 : stack1.categories)),stack1 == null || stack1 === false ? stack1 : stack1[0]), {hash:{},inverse:self.noop,fn:self.program(5, program5, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n                    <strong>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.venue)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong>\n                    ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatSecondsDate || (depth0 && depth0.formatSecondsDate)),stack1 ? stack1.call(depth0, (depth0 && depth0.createdAt), "timeOnly", options) : helperMissing.call(depth0, "formatSecondsDate", (depth0 && depth0.createdAt), "timeOnly", options)))
    + "</li>\n\n            ";
  return buffer;
  }
function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n                        <img src=\""
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.venue)),stack1 == null || stack1 === false ? stack1 : stack1.categories)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.icon)),stack1 == null || stack1 === false ? stack1 : stack1.prefix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "64"
    + escapeExpression(((stack1 = ((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 && depth0.venue)),stack1 == null || stack1 === false ? stack1 : stack1.categories)),stack1 == null || stack1 === false ? stack1 : stack1[0])),stack1 == null || stack1 === false ? stack1 : stack1.icon)),stack1 == null || stack1 === false ? stack1 : stack1.suffix)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n                    ";
  return buffer;
  }

function program7(depth0,data) {
  
  
  return "\n    <div class=\"col-sm-12\">\n        <h2>haven't checked in anywhere</h2>\n    </div>\n";
  }

  buffer += "<div class=\"row\">\n";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.checkins), {hash:{},inverse:self.program(7, program7, data),fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>";
  return buffer;
  });;