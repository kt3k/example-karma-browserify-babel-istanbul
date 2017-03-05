ansiColor('xterm') {
node('rzdockeruat') {
   stage 'Checking out GitHub Repo' 
   //git url: 'https://github.com/TheUncharted/karma-webpack-example.git'
   git url: 'https://github.com/TheUncharted/karma-browserify-isparta-example.git'
   
 def maven = docker.build('karma');
 
    sh 'chmod +x ./entrypoint.sh'
 stage('Build') {
      // Spin up a Maven container to build the petclinic app from source.
      // First set up a shared Maven repo so we don't need to download all dependencies on every build.
      maven.inside {
        sh "chmod +x ./entrypoint.sh"
        sh "./entrypoint.sh"
        sh "ps aux | grep Xvfb"
        sh "npm test"
      }
    }
    stage('Report'){
        
        junit allowEmptyResults: true, testResults: 'build/junit/**/*.xml'
    
        // Publish coverage results
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'build/coverage/Chrome 37.0.2062 (Linux 0.0.0)/', reportFiles: 'index.html', reportName: 'Coverage Report'])

    }
    
}
}
