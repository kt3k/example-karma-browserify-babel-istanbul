#!groovy
// These 2 need to be authorized using jenkins script approval
// http://your.jenkins.host/scriptApproval/
import groovy.json.JsonOutput
import java.util.Optional

// Add whichever params you think you'd most want to have
// replace the slackURL below with the hook url provided by
// slack when you configure the webhook

def notifySlack(text, channel, attachments) {

    //your  slack integration url
    def slackURL = 'https://hooks.slack.com/services/AAAA/AAAA' 
    //from the jenkins wiki, you can updload an avatar and
    //use that one
    def jenkinsIcon = 'https://wiki.jenkins-ci.org/download/attachments/327683/JENKINS?version=1&modificationDate=1302750804000'
    
    def payload = JsonOutput.toJson([text      : text,
                                     channel   : channel,
                                     username  : "jenkins",
                                     icon_url: jenkinsIcon,
                                     attachments: attachments])
                                     
    sh "curl -X POST --data-urlencode \'payload=${payload}\' ${slackURL}"
}

ansiColor('xterm') {
   node('rzdockeruat') {
      stage 'Checking out GitHub Repo' 
      
       // send to Slack
       slackSend (color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
      
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
            step([$class: 'JUnitResultArchiver', testResults: 'build/junit/**/*.xml', healthScaleFactor: 1.0])
            publishHTML([allowMissing: false, alwaysLinkToLastBuild: false, keepAll: false, reportDir: 'build/coverage/Chrome 37.0.2062 (Linux 0.0.0)/', reportFiles: 'index.html', reportName: 'Coverage Report'])
            //slackSend (color: '#FFFF00', message: "STARTED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL}/testReport/)")
            
             // currentBuild.result will be null if no problem
        // or UNSTABLE if the JunitResultArchiver found failing tests
        def buildColor = currentBuild.result == null? "good": "warning"
        def buildStatus = currentBuild.result == null? "Success": currentBuild.result
        //configure emoji, because that's what millenials do
        def buildEmoji = currentBuild.result == null? ":smirk:":":cold_sweat:"
        
        //modify #build-channel to the build channel you want
        //for public channels don't forget the # (hash)
        notifySlack("${buildStatus}", "jenkins",
            [[
                title: "${env.JOB_NAME} build ${env.BUILD_NUMBER}",
                color: buildColor,
                text: """${buildEmoji} Build ${buildStatus}. 
                |${env.BUILD_URL}
                |branch: ${env.BRANCH_NAME}""".stripMargin()
            ]])
            
         }
      }
    
    
   }
}
