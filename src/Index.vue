<template>
  <div id="app" >
    
    <div class="header">

    </div>

    <div class=" filterPosition" v-show="filter.length > 0">
      <div class="row filterStyle"  > 
        <div class="col-11 col-m-10 col-s-10">
          <ul class="filterTags " v-for="item in filter" :key="item">
            <li class="filterTagBorder">{{item}}</li>
            <li class="removeIcon" @click="ClearData(item)"> <img  src="/images/icon-remove.svg" alt=""></li>
          </ul>
        </div>

        <div class="col-1 col-m-2 col-s-2 clearBttnCenter">
          <button @click="ClearFilter()" class="clearBttn">Clear</button>
        </div>
        
      </div>
    </div>

    <div class="container">
      <div 
        class="row mainRow" 
        v-for="job in jobs" :key="job.id"
        v-bind:class=" {featuredBorder: job.featured } ">
         <div class="col-2 col-m-2  leftSidePosition">
              <img :src="job.logo" alt="" class="logoImg">
          </div>
        <div class="col-5 col-m-6   leftSidePosition">
         

          <div class="leftSide ">
            <ul class="list listOne ">
              <li>{{job.company}} </li>
              <li class="newTag" v-show="job.new">NEW! </li>
              <li class="featuredTag" v-show="job.featured">FEATURED</li>
            </ul>

            <ul class="list listTwo">
              <li>{{job.position}}</li>
            </ul>

            <ul class="list listThree">
              <li>{{job.postedAt}}</li>
              <li class="disc">{{job.contract}}</li>
              <li class="disc">{{job.location}}</li>
            </ul>
            
          </div>

        </div>

        <div class="col-5 col-m-4 tagsPosition" >
            <ul>
              <li><button @click="TagFilter(job.role,  'role')"> {{job.role}} </button> </li>
              <li> <button @click="TagFilter(job.level, 'level')"> {{job.level}} </button></li>
               <li  v-for="lang in job.languages" :key="lang"><button @click="TagFilter(lang, 'languages')"> {{lang}} </button></li> 
            </ul>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vuex from 'vuex';
import axios from 'axios';
export default {
  name: 'App', Vuex,
  data() {
    return {
      jobs: [],
      jobsBackup:[],
      errors: [],
      filter: [],
      indicator:[],
    }
  },
  
 mounted() {
    this.getData();
  },
  methods: {
    getData(){
      axios.get('./data.json')
        .then(response => {
          this.jobs = this.jobsBackup = response.data})
        .catch(e => {
          this.errors.push(e)})
        
  },
    TagFilter(value, indicator){

      if(!this.filter.includes(value)){
        this.indicator.push(indicator);
        this.filter.push(value);
      }

      this.jobs = this.jobs.filter(job => job[indicator].includes(value) );
    },

    ClearFilter(){
      this.filter= [];
      this.indicator = [];
      this.getData();
    },
    ClearData(value){
      
      let index = this.filter.indexOf(value);

      this.filter.splice(index, 1)
      this.indicator.splice(index, 1)

      if(this.filter.length > 0){
      this.jobs = this.jobsBackup;
        for(let i = 0; i < this.filter.length; i++){
        this.TagFilter(this.filter[i], this.indicator[i]);
        console.log(this.filter.length)
      }
      }else this.jobs = this.jobsBackup;
      

    
    }

    
  },
    
}
</script>

<style>

</style>
