this["Templates"] = this["Templates"] || {};
this["Templates"]["FoursquareCheckins"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, options;
  buffer += "\n    <p><strong>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.venue)),stack1 == null || stack1 === false ? stack1 : stack1.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</strong> ";
  options = {hash:{},data:data};
  buffer += escapeExpression(((stack1 = helpers.formatSecondsDate || (depth0 && depth0.formatSecondsDate)),stack1 ? stack1.call(depth0, (depth0 && depth0.createdAt), "long", options) : helperMissing.call(depth0, "formatSecondsDate", (depth0 && depth0.createdAt), "long", options)))
    + "</p>\n";
  return buffer;
  }

  buffer += "<h1>Checkins:</h1>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.checkins), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;
  });;