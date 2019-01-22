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
  ngOnInit(){
    var data1 = [4, 8, 15, 16, 23, 42,100, 5];

    d3.select(".chart")
      .selectAll("div")
      .data(data1)
      .enter()
        .append("div")
        .style("width", function(d) { return d*10 + "px"; })
        .style("background-color", "blue")
        .text(function(d) { return "HERE "+ d; }); 



    var useData = data.Responses;
    var totalLen = Object.keys(useData).length;
    
    var timestamp = useData[0].Major
    console.log("Json data : ", useData);    
    
    var averageList =[]; 
    useData.forEach(data => {
      d3.select("body")
        .selectAll("p")
        .data(  [data.Name]  ).append("p")
        .text(function(d) { return d; });
      
      averageList.push(parseInt(data.VisualisationSkill)+parseInt(data.StatisticalSkill)+parseInt(data.MathematicsSkill)+parseInt(data.ArtisticSkill)+parseInt(data.ComputerSkill)+parseInt(data.ProgrammingSkill)+parseInt(data.GraphicsSkill)+parseInt(data.InteractionSkill)+parseInt(data.EvaluationSkill)+parseInt(data.CommunicationSkill)+parseInt(data.CollaborationSkill)+parseInt(data.RepositorySkill)/12)
    });

    var oldMax = averageList.reduce(function(a, b) {
      return(Math.max(a, b));
    });
    var oldMin = averageList.reduce(function(a, b) {
      return(Math.min(a, b));
    }); 
    var newMax = 30;
    var newMin = 10
    
    var OldRange = (oldMax - oldMin)  
    var NewRange = (newMax - newMin)  

    var width = $(window).width()
    var height = 500;

    var posW = 1;
    var posH = 1; 

    var canvas = d3.select(".participants")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
      //.attr("fill", "red")      

    useData.forEach(data => {
      var oldValue = parseInt(data.VisualisationSkill)+parseInt(data.StatisticalSkill)+parseInt(data.MathematicsSkill)+parseInt(data.ArtisticSkill)+parseInt(data.ComputerSkill)+parseInt(data.ProgrammingSkill)+parseInt(data.GraphicsSkill)+parseInt(data.InteractionSkill)+parseInt(data.EvaluationSkill)+parseInt(data.CommunicationSkill)+parseInt(data.CollaborationSkill)+parseInt(data.RepositorySkill)/12
      var NewValue = (((oldValue - oldMin) * NewRange) / OldRange) + newMin;
      /*console.log("AVERAGE ", oldValue)
      console.log("NEW  ", NewValue)*/
      

      if (50*posW < width) {
        canvas.append("circle")
        .attr("cx", 50 * posW)
        .attr("cy", 80 * posH)
        .attr("r", NewValue)
        .attr("id", function(d) { return data.Name; })
        //.data( data )   
        .on('mouseover',function() {
          d3.select(this)
            .transition()
            .duration(300)
            .attr("fill", "blue");

          //var inforuta = ;
        })
        .on('mouseout',function() {
          d3.select(this)
            .transition()
            .duration(300)
            .attr("fill", "red")
        })
        
        posW++;
      }
      else {
        posW = 1;
        posH++;
      }
    });
    var circles = canvas.selectAll("circle")
      .attr("fill", "red")

/*    canvas.append("circle")
      .attr("cx", 50)
      .attr("cy", 100)
      .attr("r", 25)
*/
/*    var circles = canvas.selectAll("circle")
      .data( testData )
      .attr("fill", "red")
      .enter()
        .append("circle")
        .attr("cx", 50)
        .attr("cy", 50)
        .attr("fill", "green")
        .attr("r", 25);
*/
/*
    var p = d3.select("body")
    .selectAll("p")
    .data(  [timestamp]  )
    .text(function(d) { return d; }
  );*/
  
  }
}
