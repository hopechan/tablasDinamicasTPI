pipeline{
    agent any
    stages{
        stage('Repositorio Frontend'){
            steps{
                git'https://github.com/hopechan/tablasDinamicasTPI'
            }
        }
        
       stage('Construir y enviar al registry'){
            steps{
                script {
                    echo "Build in server"
                    withDockerServer([uri:"tcp://172.17.0.1:2376"]) { s->
                            def app = docker.build('localhost:5000/frontend:latest', 'FrontEnd/.')
                        withDockerRegistry([url:'https://localhost:5000']) { r->
                                app.push("latest")
                        }
                    }
                }
            }
        }
     stage('lanzar swarm'){
         steps{
             node('slave'){
                 sh"docker stack deploy --compose-file docker-compose.yml stackMantenimiento"
             }
         }
     }
       
    }
}
