window.onload= function(){
    window.jsPDF = window.jspdf.jsPDF;
    var doc = jsPDF();

    var addSubjectBtn = document.getElementById("add_subjects");
    addSubjectBtn.onclick = function(){
        var div = document.createElement("div");
        div.id= "form-group";

        var subject = document.createElement("input");
        subject.name= "subject";
        subject.placeholder = "Subject Name";
        subject.type ="text";
        subject.className = "subjects";

        var fullmark = document.createElement("input");
        fullmark.name = "fullmarks";
        fullmark.placeholder = "Fullmarks";
        fullmark.type = "number";
        fullmark.className ="fullmarks"

        var obtainedMark = document.createElement("input");
        obtainedMark.className = "obtained-mark";
        obtainedMark.placeholder = "Obtained Mark";
        obtainedMark.type = "number";

        var deleteBox =document.createElement("button");
        deleteBox.name = "Delete";
        deleteBox.type ="button";
        deleteBox.className ="delete-button"
        deleteBox.innerHTML = "<i class='fa fa-trash'></i>"

        div.append(subject);
        div.append(fullmark);
        div.append(obtainedMark);
        div.append(deleteBox);


        var form = document.getElementById("dynamic-area");
        form.append(div);

        

    //Addding table

        var tr=document.createElement("tr");
        tr.className = "sheet";
        
        var subjectName=document.createElement("td");

        var fullMark=document.createElement("td");

        var obtainMark=document.createElement("td");


        

        //Adding Output of HEADING
        tr.append(subjectName);
        tr.append(fullMark);
        tr.append(obtainMark);


        var outputform = document.getElementById("dynamicarea");
        outputform.append(tr);

   //Adding subject name

         subject.oninput=function(){
           subjectName.innerHTML = this.value;
         }

   //Adding FullMark

         fullmark.oninput=function() {
           fullMark.innerHTML = this.value;
         }

   //Adding Obtain mark  

         obtainedMark.oninput=function(){
           obtainMark.innerHTML = this.value;

         var totalMarks = 0 ;    
         var obtaineMark = document.getElementsByClassName("obtained-mark");
         for(var i=0; i<obtaineMark.length; i++) {      

            var num = Number(obtaineMark[i].value);
            totalMarks = totalMarks+num ;
         }  

         var totalMarkstd = document.getElementById("total-mark");
         totalMarkstd.innerHTML = totalMarks;

         var noOfSubjects = obtaineMark.length;
         var percentage = parseInt(totalMarks/noOfSubjects);

          var percentagetd =document.getElementById("percentage")
         percentagetd.innerHTML =  percentage + '%';
         

         var grade ="";
         if(percentage>90)
         {
             grade = "A+";
         }
         else if(percentage>80){
            grade = "A";
         }
         else if(percentage>70){
            grade = "B";
         }
         else if(percentage>60){
            grade = "B+";
         }
         else if(percentage>50){
            grade = "C";
         }
         else if(percentage>40){
            grade = "D";
         }
         else if(percentage>35){
            grade = "P";
         }
         else{
            grade = "F";
         }

         var gradeTd = document.getElementById("grade");
         gradeTd.innerHTML = grade;
        }

    //Deleting table

         deleteBox.onclick = function(){
            div.remove();
            tr.remove();
        }
         
   
    }


    

    //Upload images

    var picInput = document.getElementById("pic-input");
    picInput.onchange=function(){
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        var studentPic = document.getElementById("pics");

        studentPic.src = url;
    }

    //Upload school logo

    var schoolPicInput = document.getElementById("schoolpic-input");
    schoolPicInput.onchange = function(){
        var file = this.files[0];
        var url = URL.createObjectURL(file);
        var schoolPics =document.getElementById("school-pics");

        schoolPics.src = url;
    }

    //Upload school name

    var schoolName= document.getElementById("school_name");
    schoolName.onchange= function(){

        var schoolName =document.getElementById("school-name");
       schoolName.innerHTML = this.value;
    }


    //Upload Student Details

    var studentName= document.getElementById("student_name");
    studentName.onchange= function(){

        var studentName =document.getElementById("studentname");
        studentName.innerHTML = this.value;
    }

    var fatherName= document.getElementById("father_name");
    fatherName.onchange= function(){

        var paName =document.getElementById("fathername");
        paName.innerHTML = this.value;
    }
    
    var rollInput=document.getElementById("rollinput");
    rollInput.onchange= function() {

             var rollNo =document.getElementById("rollno");
             rollNo.innerHTML =this.value;
    }

    var classInput =document.getElementById("classinput");
    classInput.onchange= function(){
        var classNo =document.getElementById("class");
        classNo.innerHTML = this.value;
    }
   
    var genderInput =document.getElementById("genderinput");
    genderInput.onchange=function(){
        var gender = document.getElementById("gender");
        gender.innerHTML = this.value;
    }

    var dobInput =document.getElementById("dobinput");
    dobInput.onchange =function(){
        var doB = document.getElementById("dob");
        doB.innerHTML = this.value;
    }

    var findTextWidth = function(text, fontSize){
        var textWidth = doc.getTextDimensions(text,{
            fontSize: fontSize
        }).w;
        return textWidth;
    }
     //Export to pdf
    var form =document.getElementById("marksheet-form");
    form.onsubmit = function(e){
        e.preventDefault();
        var elements = form.elements;
         var schoolLogo = elements.schoollogo.files[0];
         var schoolLogoUrl = URL.createObjectURL(schoolLogo);
         var schoolName = elements.schoolname.value;
         var tagLine = elements.tagline.value;
         var tagLine1 = elements.tagline1.value;


         var studentImage = elements.studentimage.files[0];
         var studentImageUrl = URL.createObjectURL(studentImage);
         var fullname = elements.fullName.value;
         var fathername = elements.fatherName.value;
         var classN = elements.class.value;
         var rollNo = elements.rollno.value;
         var doB = elements.dob.value;
         var genDer = elements.gender.value;
    

         //Getting subject values
        var subjects =document.getElementsByClassName("subjects");
        var fullmarks =document.getElementsByClassName("fullmarks");
        var obtainedMarks =document.getElementsByClassName("obtained-mark");


        var subjectsBody=[];
        for(var i=0; i<subjects.length; i++ )
        {
             var subject=subjects[i].value;
             var fullmark=fullmarks[i].value;
             var obtainedMark=obtainedMarks[i].value;
            subjectsBody.push([subject,fullmark,obtainedMark])
        }

        subjectsBody.push();

     //Generating pdf
     var schoolLogoWidth =30;
     var pageWidth = doc.internal.pageSize.width;
     var schoolLogoLeftMargin = (pageWidth-schoolLogoWidth)/2;
     doc.addImage(schoolLogoUrl,'PNG',schoolLogoLeftMargin, 5, schoolLogoWidth, 30);
     

    
     //setting School Name
     var schoolNameFontSize = 28;
     var schoolNameWidth =findTextWidth(schoolName, schoolNameFontSize);
     var schoolNameLeftMargin = (pageWidth-schoolNameWidth)/2; 
     doc.setFontSize(schoolNameFontSize);
     doc.text(schoolName,schoolNameLeftMargin, 45);

    //Setting tagline
    var tagLineFontSize = 14;
    var tagLineWidth = findTextWidth(tagLine, tagLineFontSize);
    var tagLineLeftMargin = (pageWidth-tagLineWidth)/2;
    doc.setFontSize(tagLineFontSize);
    doc.text(tagLine,tagLineLeftMargin,53);

     //Setting tagline
     var tagLine1FontSize = 18;
     var tagLine1Width = findTextWidth(tagLine1, tagLine1FontSize);
     var tagLine1LeftMargin = (pageWidth-tagLine1Width)/2;
     doc.setFontSize(tagLine1FontSize);
     doc.text(tagLine1,tagLine1LeftMargin,62);

    //Setting Student Image
    var studentImageWidth = 30; 
    var studentLeftMargin = (pageWidth-studentImageWidth-20);
    var studentInfoTopmargin= 54;
    doc.addImage(studentImageUrl,'PNG',studentLeftMargin,studentInfoTopmargin,studentImageWidth,30)

    //Setting Student details table
    doc.autoTable({
        styles:{cellPadding:'2'},
        margin:{top:73},
        tableWidth:'auto',
        body: [
            [
                {content:"Student's Name", styles: {textColor:'#1010D0',fontSize:'12',fillColor:null,fontStyle:'bold'}} , 
                {content:fullname, styles: {fontSize:'11',fillColor:null},Margin:{left:10}} 
            ], 
            [ 
                {content:"Father's Name", styles: {textColor:'#1010D0',fontSize:'12',fillColor:null,fontStyle:'bold'}} , 
                {content:fathername,styles: {fontSize:'11',fillColor:null}}
            ],
            [
                {content:"Roll.No", styles: {textColor:'#1010D0',fontSize:'12',fillColor:null,fontStyle:'bold'}} ,
                {content:rollNo, styles: {fontSize:'11',fillColor:null}} 
            ],

                [{content:"Class", styles: {textColor:'#1010D0',fillColor:null,fontSize:'12',fontStyle:'bold'}} , 
                {content:classN, styles: {fontSize:'11',fillColor:null}}
            ],
            [
                {content:"DOB", styles: {textColor:'#1010D0',fillColor:null,fontSize:'12',fontStyle:'bold'}} , 
                {content:doB, styles: {fontSize:'11',fillColor:null}}
            ], 
            [  
                {content:"Gender", styles: {textColor:'#1010D0',fillColor:null,fontSize:'12',fontStyle:'bold'}} , 
                {content:genDer, styles: {fontSize:'11',fillColor:null}}
            ]
           
        ]

    });

    //Setting marks table
    doc.autoTable({
        margin:{top:88},
        styles:{halign:'center'},
        head:[["SUBJECTS","FULL MARKS","MARKS OBTAINED"]],
        body:subjectsBody
    })

    var total =0;
    for(var i=0; i<obtainedMarks.length; i++)
    {
       total = total+Number(obtainedMarks[i].value)
    }
     
    var percent = Math.floor(total/obtainedMarks.length);

    var grade ="";
         if(percent>90)
         {
             grade = "A+";
         }
         else if(percent>80){
            grade = "A";
         }
         else if(percent>70){
            grade = "B";
         }
         else if(percent>60){
            grade = "B+";
         }
         else if(percent>50){
            grade = "C";
         }
         else if(percent>40){
            grade = "D";
         }
         else if(percent>35){
            grade = "P";
         }
         else{
            grade = "F";
         }

    doc.autoTable({
        margin:{top:90},
        styles:{halign:'center'},
        head:[ ['Grade','Percentage','Total Marks',]],
        body:[[grade,percent+'%',total]]
    })

    doc.setFillColor(135, 124, 45, 0);

     doc.save("marksheet.pdf");

         

    }

}
