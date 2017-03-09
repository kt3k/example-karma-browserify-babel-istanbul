ansiColor('xterm') {
   node('rzdockeruat') {
      stage 'Checking out GitHub Repo' 
      //git url: 'https://github.com/TheUncharted/karma-webpack-example.git'
      git url: 'https://github.com/TheUncharted/example-karma-browserify-babel-istanbul.git'
   
      def maven = docker.build('karmababel');
      sh 'chmod +x ./entrypoint.sh'
      
      try {
         stage('Build') {
         // Spin up a Maven container to build the petclinic app from source.
         // First set up a shared Maven repo so we don't need to download all dependencies on every build.
            maven.inside {
               sh "npm install"
               sh "chmod +x ./entrypoint.sh"
               sh "./entrypoint.sh"
               sh "ps aux | grep Xvfb"
               sh "npm test"
               sh "ls -lR build/junit"
            }
         }
      }
      catch (err) {
         if (currentBuild.result == 'UNSTABLE')
            currentBuild.result = 'FAILURE'
         throw err
      } finally {
         stage('Report') {
            step([$class: 'JUnitResultArchiver', testResults: '**/reports/junit/*.xml', healthScaleFactor: 1.0])
            publishHTML (target: [
               allowMissing: false,
               alwaysLinkToLastBuild: false,
               keepAll: true,
               reportDir: 'coverage',
               reportFiles: 'index.html',
               reportName: "Junit Report"
               ])
         }
      }
    
    
   }
}
