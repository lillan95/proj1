import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";

declare var require: any;
var data = require('../../src/allData.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ngOnInit(){

    var useData = data.Responses;
    var totalLen = Object.keys(useData).length;
    
    var timestamp = useData[0].Major

    console.log("Json data : ", useData);    

    
    useData.forEach(data => {
      //console.log(data.Major)
      d3.select("body")
      .selectAll("p")
      .data(  [data.Name]  ).append("p")
      .text(function(d) { return d; });
    });

/*
    var p = d3.select("body")
    .selectAll("p")
    .data(  [timestamp]  )
    .text(function(d) { return d; }
  );*/
  
  }
}
