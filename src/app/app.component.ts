import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import $ from "jquery";

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
    var canvas2 = d3.select(".chartArrange")
      .append("svg")
      .attr("width", "400")
      .attr("height", "300")
      .style("background-color", "green");

    this.rearange = () => {
      buttonClicked = !buttonClicked;
      

      if (buttonClicked){
        allC._groups[0].forEach(circle => {
          finalGroup.forEach(function (value, i) {
          value.forEach(participant => {
            if (participant[1].Name == circle.id){
              //console.log( participant[1].Name, " AND ", circle.id, " and ", i, circle)
              var colors = ["#CC0000", "#FF8000", "#FFFF00", "#00FF00", "#00FFFF", "#0080FF", "#0000FF", "#6600CC", "#FF007F", "#404040"]
              d3.select(circle)
                .transition()
                .duration(1000)
                .attr("fill", colors[i])
                .attr("class", "group"+i)
              }
            });
          });
        });
      }else{
        var circles = canvas.selectAll("circle")
          .transition()
          .duration(1000)
          .attr("fill", "red")
      }   
      d3.selectAll(".group0")
        .transition()
        .duration(500)
        .attr("cx", function (d, i) {
          console.log("HEREEE ",d)
          return i * 50 + 1000;
        })
        .attr("cy", 100)

        
    } 
    //var data1 = [9, 8, 15, 16, 23, 42,100, 5];

    var useData = data.Responses;
    var totalLen = Object.keys(useData).length;
    
    var timestamp = useData[0].Major
    //console.log("Json data : ", useData);    
    var averageList =[]; 
    var avrList =[];
    useData.forEach(data => {
      averageList.push(((parseInt(data.VisualisationSkill)+parseInt(data.StatisticalSkill)+parseInt(data.MathematicsSkill)+parseInt(data.ArtisticSkill)+parseInt(data.ComputerSkill)+parseInt(data.ProgrammingSkill)+parseInt(data.GraphicsSkill)+parseInt(data.InteractionSkill)+parseInt(data.EvaluationSkill)+parseInt(data.CommunicationSkill)+parseInt(data.CollaborationSkill)+parseInt(data.RepositorySkill))/12))
      avrList.push([((parseInt(data.VisualisationSkill)+parseInt(data.StatisticalSkill)+parseInt(data.MathematicsSkill)+parseInt(data.ArtisticSkill)+parseInt(data.ComputerSkill)+parseInt(data.ProgrammingSkill)+parseInt(data.GraphicsSkill)+parseInt(data.InteractionSkill)+parseInt(data.EvaluationSkill)+parseInt(data.CommunicationSkill)+parseInt(data.CollaborationSkill)+parseInt(data.RepositorySkill))/12), data])
    });
    var sortedAvr = avrList.sort(function(a, b){ ;return a[0] - b[0]});

    var groupTemp=[], finalGroup =[]
    var pushed = 0;
    var groupSize = 6
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
      .style("background-color", "#ffebee");

      d3.selectAll(".label")
      .text(function(i,d) { return skillList[d] })
      //.style("background-color", "red" )
      //.text(function(i) { return i })
      finalGroup.forEach(function (value, i) {        
        value.forEach(data => {
        
        var oldValue = data[0]
        var NewValue = (((oldValue - oldMin) * NewRange) / OldRange) + newMin;
        if (50*posW >= width) {
          posW = 1;
          posH++;
        }
        if (50*posW < width) {
          canvas.append("circle")
            .attr("cx", 50 * posW)
            .attr("cy", 80 * posH)
            .attr("r", NewValue)
            .attr("class", "group"+i)
            .attr("id", function(d) { return data[1].Name; })
            .on('mouseover',function() {
              d3.selectAll(".toremove")
                .remove();
              currentCol = d3.select(this).style('fill')
              var darkerCol = d3.rgb(currentCol).darker(2)
              d3.select(this)
                .transition()
                .duration(100)
                .attr("fill", darkerCol.toString());
              
              useData.forEach(element => {
                if (element.Name == this.id) {
                  d3.select(".skillHeader")
                    .text(this.id + "'s skills")

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
              .duration(300)
              .attr("fill", currentCol)
            charts.select("h2")
                .text("Skills")
          })
          posW++;
        }
      });
    })
    var charts = d3.select(".chart")
      .append("h2")
        .attr("class", "skillHeader")
        .text("Skills")

    var circles = canvas.selectAll("circle")
      .attr("fill", "red")

  //console.log("list ", finalGroup)
  var allC = canvas.selectAll("circle")
  }
}
