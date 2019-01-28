import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import $ from "jquery";
import { attachEmbeddedView } from '@angular/core/src/view';
//import { posix } from 'path';
//import { all } from 'q';

declare var require: any;
var data = require('../../src/allData.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public rearange: Function;

  ngOnInit(){
    var buttonClicked = false;
    var groupTemp = [], finalGroup = []
    
    /*
    var canvas2 = d3.select(".chartArrange")
      .append("svg")
      .attr("width", "400")
      .attr("height", "300")
      .style("background-color", "green");*/

    this.rearange = () => {
      

      buttonClicked = !buttonClicked;

      var colors = ["#CC0000", "#FF8000", "#FFFF00", "#00FF00", "#00FFFF", "#0080FF", "#0000FF", "#6600CC", "#FF007F", "#404040"]
      var groupAvr = []
      if (buttonClicked){
        finalGroup.forEach(function (value, i) {
          var tempAvr = 0;
          value.forEach(participant => {
            d3.select("#" + participant[1].Name.replace(/\s/g, ''))
            //.data(participant[0])            
              .transition()
              .duration(1000)
              .attr("class", "group"+i)
            tempAvr = tempAvr + participant[0];
          });
          groupAvr.push(tempAvr/value.length)
        });

        groupAvr.forEach(function (value, i) {
          var groupX = i * 140 + 60,
          groupY = 150;
          d3.selectAll(".group"+i)
            .attr("fill", colors[i])
            .transition()
            .delay(800)
            .duration(800)
            .ease(d3.easeElasticInOut.period(1.5))
            .attr("cx", groupX)
            .attr("cy", groupY)

          canvas.append("circle")
            .attr("id", "group"+i)
            .attr("class", "circleGroup")
            //.data(value)
            .transition()
            .delay(1600)
            .duration(800)
            .attr("cx", groupX)
            .attr("cy", groupY)
            .attr("r", function() { return value*10})//value*10)
            .attr("fill", colors[i])

          d3.selectAll(".circleGroup")
            .on('mouseover',function() {
              d3.selectAll(".toremove")
                .remove();
              groupAvr.forEach(function (value, i) {
                var groupX = i * 140 + 60,
                groupY = 150;
                d3.selectAll(".group"+i)
                  .attr("fill", colors[i])
                  .transition()
                  .duration(800)
                  .ease(d3.easeElasticInOut.period(1.5))
                  .attr("cx", groupX)
                  .attr("cy", groupY)
              });
              currentCol = d3.select(this).style('fill')
              var darkerCol = d3.rgb(currentCol).darker(2)
              d3.select(this)
                .transition()
                .duration(500)
                .attr("fill", darkerCol.toString());

              var groupNumber = parseInt($(this).attr('id').slice(-1))+1

              var groupAvrSkill = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              var averageGroup = 0;

              finalGroup[groupNumber-1].forEach(function(value, i) {
                var temp = i
                var participant = value;
                groupAvrSkill = [groupAvrSkill[0] + parseInt(participant[1].VisualisationSkill), groupAvrSkill[1]+parseInt(participant[1].StatisticalSkill) , groupAvrSkill[2]+parseInt(participant[1].MathematicsSkill), groupAvrSkill[3]+parseInt(participant[1].ArtisticSkill), groupAvrSkill[4]+parseInt(participant[1].ComputerSkill), groupAvrSkill[5]+parseInt(participant[1].ProgrammingSkill) , groupAvrSkill[6]+parseInt(participant[1].GraphicsSkill) , groupAvrSkill[7]+ parseInt(participant[1].InteractionSkill) , groupAvrSkill[8]+parseInt(participant[1].EvaluationSkill) , groupAvrSkill[9]+parseInt(participant[1].CommunicationSkill) , groupAvrSkill[10]+parseInt(participant[1].CollaborationSkill), groupAvrSkill[11]+parseInt(participant[1].RepositorySkill)]
                value.forEach(function(value) {
                  if (value.Name){
                    var groupInd = value.Name.replace(/\s/g, '')
                    var startPosX = (groupNumber * 100 + temp*100 )

                    d3.select("#"+groupInd)
                      .transition()
                      .attr("cx", startPosX)
                      .duration(800)
                      .attr("cy", 260)
                  }
                });
                averageGroup = averageGroup + participant[0]
              });
              averageGroup = (averageGroup/finalGroup[groupNumber-1].length)

              groupAvrSkill.forEach(function(value, i) {
                groupAvrSkill[i] = parseFloat((groupAvrSkill[i]/finalGroup[groupNumber-1].length).toFixed(1));  
              });

              d3.select(".skillHeader")
              .text("Group " + groupNumber + "'s average skills (Average " + averageGroup.toFixed(2) + ")" )
              
              var testing = d3.selectAll(".datahere")
                .append("div")
                  .attr("class", "toremove")
                  .data(groupAvrSkill)
                  .style("height", function(d) { return  d*20 + "px"; })
                  .style("width", "100%")
                  .style("background-color", "blue")
                  .text(function( d) { return   d; })
                  .style("color", "white")
                  .style("vertical-align", "baseline")
                  .style("padding-right", "1em");
            })
          .on('mouseout',function() {
            d3.select(this)
              .transition()
              .duration(50)
              .attr("fill", currentCol)
            charts.select("h2")
                .text("Skills")
          })            
        });
      }else{
        d3.selectAll(".circleGroup")
          .remove()

        posW = 1;
        posH = 1;
        finalGroup.forEach(function (value, i) {        
          value.forEach(dataObj => {         
            if (50*posW >= width) {
              posW = 1;
              posH++;
            }
            if (50*posW < width) {
              canvas.select("#"+dataObj[1].Name.replace(/\s/g, ''))
                .transition()
                .duration(1000)
                .attr("cx", function() {  return 60 * posW  })
                .attr("cy", 80 * posH)
                .attr("fill", "red")
                posW++;
            }
            
        /*var circles = canvas.selectAll("circle")
          .transition()
          .duration(1000)
          .attr("fill", "red")*/
        })
         
      })
    }
    var x = document.getElementById("avrButton")
    var hideHobby = document.getElementById("hobby")
      if (buttonClicked) {
        x.innerHTML = "None";
        hideHobby.style.display = "none";
      } else {
        x.innerHTML = "Average";
        hideHobby.style.display = "block";
      }
  }
        //var data1 = [9, 8, 15, 16, 23, 42,100, 5];

    var useData = data.Responses;
    var totalLen = Object.keys(useData).length;
    
    var timestamp = useData[0].Major
    //console.log("Json data : ", useData);    
    var avrList =[];
    useData.forEach(data => {
      avrList.push([((parseInt(data.VisualisationSkill)+parseInt(data.StatisticalSkill)+parseInt(data.MathematicsSkill)+parseInt(data.ArtisticSkill)+parseInt(data.ComputerSkill)+parseInt(data.ProgrammingSkill)+parseInt(data.GraphicsSkill)+parseInt(data.InteractionSkill)+parseInt(data.EvaluationSkill)+parseInt(data.CommunicationSkill)+parseInt(data.CollaborationSkill)+parseInt(data.RepositorySkill))/12), data])
    });
    var sortedAvr = avrList.sort(function(a, b){ ;return a[0] - b[0]});

    var groupSize = 6    
    var pushed = 0;
    var flag = true
    var modul = Object.keys(useData).length % 10;

    sortedAvr.forEach(element => {
      groupTemp.push(element);
      if (pushed == modul && flag) { groupSize = groupSize-1; flag= false}
      if(groupTemp.length == groupSize) {
        finalGroup.push(groupTemp);
        groupTemp = [];
        pushed++;
      } 
    });
    var oldMax = sortedAvr[sortedAvr.length-1][0];
    var oldMin = sortedAvr[0][0]
    var currentCol;

    var newMax = 30,
    newMin = 10,
    OldRange = (oldMax - oldMin),
    NewRange = (newMax - newMin)  ,

    width = 700,//$(window).width(),
    height = 450,

    posW = 1,
    posH = 1,
    skillList = ["Visualisation ", "Statistics ", "Mathematics ", "Artistic", "Computer", "Programming", "Graphics", "Interaction", "Evaluation", "Communication", "Collaboration", "Repository"]

    var canvas = d3.select(".chart")
      .append("svg")
      .attr("width", window.outerWidth)
      .attr("height", height)
      //.style("background-color", "#ffebee");

      d3.selectAll(".label")
      .text(function(i,d) { return skillList[d] })
      //.style("background-color", "red" )
      //.text(function(i) { return i })
      finalGroup.forEach(function (value, i) {        
        value.forEach(dataObj => {

        
        var oldValue = dataObj[0]
        var NewValue = (((oldValue - oldMin) * NewRange) / OldRange) + newMin;
        if (50*posW >= width) {
          posW = 1;
          posH++;
        }
        if (50*posW < width) {
          canvas.append("circle")
            .attr("cx", 60 * posW)
            .attr("cy", 80 * posH)
            .attr("r", NewValue)
            .attr("fill", "red")
            .attr("class", "group"+i)
            .text(function(d) { return dataObj[1].Name })
            .attr("id", function(d) { return dataObj[1].Name.replace(/\s/g, ''); })
            .on('mouseover',function() {

              d3.selectAll(".toremove")
                .remove();
              currentCol = d3.select(this).style('fill')
              var darkerCol = d3.rgb(currentCol).darker(2)
              d3.select(this)
                .transition()
                .duration(50)
                .attr("fill", darkerCol.toString());
              
              useData.forEach(element => {
                
                if (element.Name.replace(/\s/g, '') == this.id) {
                  d3.select(".hobbies")
                    .text(element.Hobbies)

                  d3.select(".skillHeader")
                    .text(element.Name + "'s skills (average of "+ parseFloat(dataObj[0]).toFixed(2) + " )")

                  var testing = d3.selectAll(".datahere")
                  .append("div")
                    .attr("class", "toremove")
                    .data([parseInt(element.VisualisationSkill), parseInt(element.StatisticalSkill) , parseInt(element.MathematicsSkill), parseInt(element.ArtisticSkill), parseInt(element.ComputerSkill), parseInt(element.ProgrammingSkill) , parseInt(element.GraphicsSkill) , parseInt(element.InteractionSkill) , parseInt(element.EvaluationSkill) , parseInt(element.CommunicationSkill) , parseInt(element.CollaborationSkill), parseInt(element.RepositorySkill)])
                    .style("height", function(d) { return  d*20 + "px"; })
                    .style("width", "100%")
                    .style("background-color", "blue")
                    .text(function( d) { return   d; })
                    .style("color", "white")
                    .style("vertical-align", "baseline")
                    .style("padding-right", "1em");
                } 
              });
            })
            
          .on('mouseout',function() {
            d3.select(this)
              .transition()
              .duration(50)
              .attr("fill", currentCol)
            charts.select("h2")
                .text("Skills")
          })
          canvas.select("#"+dataObj[1].Name.replace(/\s/g, '')).append("text")
            .attr("dx", posW)
            .attr("dy", posH+10)         
            .attr("text-anchor","middle")
            .attr("fill", "black")
            .text("HALLO")
          posW++;
        }  
      });
    })
    
    console.log(canvas.selectAll("text"))
    var charts = d3.select(".chart")
      .append("h2")
        .attr("class", "skillHeader")
        .text("Skills")

    /*var circles = canvas.selectAll("circle")
      .attr("fill", "red")*/

    var allC = canvas.selectAll("circle")
  }
}
