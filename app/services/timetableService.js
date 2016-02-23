app.service('timetable', function($http, $q, urls, auth){
    var self = this;
    self.user ={};

    self.getTimetable = function(type, klass){
        var defer = $q.defer();

        console.log(urls.BASE_API + '/timetable?usertype=' + type + '&klass=' + klass);
        $http.get(urls.BASE_API + '/timetable?usertype=' + type + '&klass=' + klass)
        // $http.get(urls.BASE_API + '/timetable', {usertype: type, klass: klass})

        .success(function(res){
            self.getList(res);
            defer.resolve(res);

        })
        .error(function(res){
            defer.reject(res);
        })

        return defer.promise;
    }

    self.getList = function(res){
        console.log("hello");
        var linknames = [];
        var linkdestinations = [];
        var links = $('.school a');
        var listlinks = '';
        var classes = ["G&I1A", "G&I1B", "G&I1C", "G&I1D", "GAR2-A", "GAR2-B", "GAR2-C", "GAR2-D", "GDD2-A", "GDD2-B", "IAD2-A", "IAD2-B", "UU-Minor1", "UU-Minor2", "Jaar 3 G&I", "Jaar 4 G&I"];
        
        for(var i=0; i<links.length; i++) {
                linkdestinations.push(links[i].href.substr(links[i].href.lastIndexOf('/') + 1));
                linknames.push(links[i].textContent);
                if(classes.indexOf(linknames[i]) != -1){

                    listlinks += "<a href='#' onclick=\"loadContent('"+linkdestinations[i]+"','"+linknames[i]+"')\">"+linknames[i]+"</a>";
                    console.log("this works");
                }
        }
        $('#links').html(''+listlinks+'');

        var linknames_d = [];
        var linkdestinations_d = [];
        var links_d = $('.school-docent a');
        var listlinks_d = '';
        var overzicht = "Overzichtspagina";
        
        for(var i=0; i<links_d.length; i++) {
                linkdestinations_d.push(links_d[i].href.substr(links_d[i].href.lastIndexOf('/') + 1));
                linknames_d.push(links_d[i].textContent);
                if(overzicht.indexOf(linknames_d[i]) != 1){
                    listlinks_d += "<a href='#' onclick=\"loadContent_d('"+linkdestinations_d[i]+"','"+linknames_d[i]+"')\">"+linknames_d[i]+"</a>";
                    console.log("this works too");
                }
        }
        $('#links-docent').html(''+listlinks_d+'');

    }
});
