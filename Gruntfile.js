//import { watch } from "fs";

//Déclaration d'un module compatible avec require .js
module.exports =function(grunt){
    //Définitionn de la config globale de Grunt et des taches éxéutables
    grunt.initConfig({
        //Config globale de grunt
        pkg:grunt.file.readJSON('package.json'),
        //Config de chaque pjugin
        cssmin:{
            app:{
                files:{
                    //fichier destination : fichier source
                    'dist/app.min.css':['app.css']
                }
            },
            prod:{
                files:{
                    //fichier destination : fichier source
                    'dist/prod.min.css':['app.css']
                }
            }

        },
        concat:{
            //ordre factory - service - controller
            app:{
                src:[
                'app/app.js',
                'app/*.factory.js',
                'app/*.service.js',
                'app/*.controller.js',
                ],
                dest:"dist/app.js"
            }

        },
        uglify:{
            options:{
                sourceMap:true,
                mangle:false
            },
            app:{
                'dist/bundle.min.js':['node_modules/angular/angular.min.js','dist/app.js']
            }
        },
        watch:{
            cssSrc:{
                files:['**/*.css','!node_modules/**'],
                tasks:['cssmin:app']
            },
            jsSrc:{
                files:['app/*.js'],
                tasks:['concat:app'] 
            }

        }
    });
    //Chargement des plugins
    //Minify les fichier css
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    //surveille les changements
    grunt.loadNpmTasks('grunt-contrib-watch');
    //fusionne tout les fichier js
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    //Déclaration des tâches éxécutables
    grunt.registerTask('default',['cssmin:app','concat:app']);
    //grunt.registerTask('dev',['watch']);
    grunt.registerTask('dev',['watch:cssSrc','watch:jsSrc']);

    //grunt.registerTask('gencss',['cssmin:prod']);
};