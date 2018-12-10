app.controller('systemCtrl', function($scope, $http, service){
    
    let ctx = document.getElementById("myChart").getContext('2d');
    let ctxEst = [
        document.getElementById("myChartEstado1").getContext('2d'),
        document.getElementById("myChartEstado2").getContext('2d'),
        document.getElementById("myChartEstado3").getContext('2d'),
        document.getElementById("myChartEstado4").getContext('2d')
    
    ]
     //Criando grafico de acidentes por UF
    $scope.gerarUF = function(){
        limparGrafico()
        limparMapBrasil()
        $scope.requisicao = true;
        systemService.getUf().
        then(function successCalback(response){
            $scope.requisicao = false;

            let option = {
                title: {
                   display: true,
                   fontSize: 28,
                   text: 'Número de acidentes por UF' //Titulo do grafico
               },
               tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        console.log(data)
                        return "O número de acidentes em "+ data.labels[tooltipItem.index] + " foi " + data.datasets[0].data[tooltipItem.index]; //legenda do grafico
                        
                    }
                }
               },
               legend: {
                display: true,
                position: 'bottom',
               },
               responsive: true
           }

            criaGrafico(response.data,'pie',option) //tipo de grafico, neste caso foi criado o grafico de pizza
        },
        function errorCallback(response){
            console.error('Erro ' + response);
        });
    }
})
