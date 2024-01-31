env

PORT = 8000

---

service api

/auth/register
method : POST
authen : none
params : none
body : {t_code,firstName,password,confirmPassword,email}

/auth/login
method : POST
authen : none
params : none
body : {code,password}

/auth/me
method : GET
authen : t/s
parmas : none
body : none

/homework
method : POST
authen : t
params : none
body :{question,startDate,dueDate,subjectId,teacherId,published}

/subject
method : GET
authen : 0
params : none
body : none
