const { Engine } = require('bpmn-engine')
const source = require('fs').readFileSync(
  require('path').join(__dirname, 'fraud-check.bpmn'),
  'utf8'
)

const source2 = `
<?xml version="1.0" encoding="UTF-8"?>
<definitions xmlns="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:camunda="http://camunda.org/schema/1.0/bpmn">
  <process id="theProcess" isExecutable="true">
  <startEvent id="theStart" />
  <serviceTask id="serviceTask" implementation="\${environment.services.getRequest}" camunda:resultVariable="serviceResult" />
  <endEvent id="theEnd" />
  <sequenceFlow id="flow1" sourceRef="theStart" targetRef="serviceTask" />
  <sequenceFlow id="flow2" sourceRef="serviceTask" targetRef="theEnd" />
  </process>
</definitions>`

const engine = new Engine({
  name: 'execution example',
  source: source2
})

module.exports.engine = engine
