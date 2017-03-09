ansiColor('xterm') {
node('rzdockeruat') {
   stage 'Checking out GitHub Repo' 
   //git url: 'https://github.com/TheUncharted/karma-webpack-example.git'
   git url: 'https://github.com/TheUncharted/example-karma-browserify-babel-istanbul.git'
   
 def maven = docker.build('karmababel');
 
    sh 'chmod +x ./entrypoint.sh'
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
    stage('Report'){
       
        //junit allowEmptyResults: true, testResults: 'build/junit/**/*.xml'
        //step([$class: 'JUnitResultArchiver', testResults: 'build/junit/**/*.xml', healthScaleFactor: 1.0])

        //step([$class: 'XUnitBuilder', testTimeMargin: '3000', thresholdMode: 1, thresholds: [[$class: 'FailedThreshold', failureNewThreshold: '', failureThreshold: '', unstableNewThreshold: '', unstableThreshold: ''], [$class: 'SkippedThreshold', failureNewThreshold: '', failureThreshold: '', unstableNewThreshold: '', unstableThreshold: '']], tools: [[$class: 'JUnitType', deleteOutputFiles: true, failIfNotNew: true, pattern: 'build/junit/**/*.xml', skipNoTestFiles: true, stopProcessingIfError: true]]])1
       
junit 'TestResults*.xml'       
step([
    $class: 'XUnitBuilder', testTimeMargin: '3000', thresholdMode: 1,
    thresholds: [
        [$class: 'FailedThreshold', failureNewThreshold: '', failureThreshold: '0', unstableNewThreshold: '', unstableThreshold: ''],
        [$class: 'SkippedThreshold', failureNewThreshold: '', failureThreshold: '', unstableNewThreshold: '', unstableThreshold: '']
    ],
    tools: [[
        $class: 'JUnitType',
        deleteOutputFiles: true,
        failIfNotNew: true,
        pattern: 'build/junit/**/*.xml',
        skipNoTestFiles: false,
        stopProcessingIfError: true
    ]]
])
    
        // Publish coverage results
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'build/coverage/Chrome 37.0.2062 (Linux 0.0.0)/', reportFiles: 'index.html', reportName: 'Coverage Report'])

    }
    
}
}
