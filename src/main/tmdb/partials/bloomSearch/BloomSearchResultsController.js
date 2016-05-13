/**
 * SearchController provides controller support for inline searching
 *
 * @module tmdb.partials.bloomSearchResul.BloomSearchController
 *
 * @requires angular
 * @requires ngRoute
 * @requires config
 * @requires TMDBAPIService
 *
 * @author Carlos Orozco <carlos.orozco@correounivalle.edu.co>
 *
 * @returns instance of the BloomSearchResultsController
 *
 * @copyright Alert Logic, Inc 2014
 *
 */

define( [ 'angular',
          'ngRoute',
          'config/config',
          'tmdb/services/TMDBAPIService'],
    function( angular, $routeParams, config, TMDBAPIService ) {
        "use strict";

        var BloomSearchResultsController = function( $rootScope, $scope, $timeout, TMDBAPIService ) {

            var config  = angular.module("config");
            $scope.view = {images: config.apiImg};

            $scope.showMovieInfo = function(idParametro, idType){   
                   
              $scope.currentId = idParametro;
              $scope.currentType = idType;
              
            };

            $scope.getItemType = function(index){
              if(index===0){                
                return "item active";
              }else{                
                return "item";
              }              
            };
            $scope.formatName = function(result, type){
              
                if(type==="movie"){
                    if(result.original_title){
                        return result.original_title;    
                    }else{
                        return "No name available";
                    }
                    
                }
                if(type==="tv"){
                    if(result.original_name){
                        return result.original_name;   
                    }else{
                        return "No name available";
                    }                    
                }
                if(type==="person"){
                    if(result.name){
                        return result.name;
                    }else{
                        return "No name available";
                    }                    
                }

            };

            var defaultImage = "../images/no-image.jpg";
            
            $scope.formatPath = function(result, type, view_images){
                
                if(type==="movie" || type==="tv"){
                    if(result.poster_path){
                        return view_images+result.poster_path;
                    }else{
                        return defaultImage;
                    }                                        
                }
                if(type==="person"){
                    if(result.profile_path){
                        return view_images+result.profile_path;
                    }else{
                        return defaultImage;
                    } 
                }                
                
            };

            $scope.moveToDiv = function(){
                $timeout(function(){
                    $rootScope.$emit('moveDivTVInfo.event');
                }, 100);                
            };

            
            
            
        };


        BloomSearchResultsController.$inject = ['$rootScope', '$scope', '$timeout','TMDBAPIService' ];


        return BloomSearchResultsController;
    }
);