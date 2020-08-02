let str = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Title</title>
</head>
<body>
<%=name%> <%=age%>


<%=arr.forEach(item => {%>
<li><%=item%></li>

<%=})%>
</body>
</html>`



// 1. 读取模版字符串
// 2. 替换 <% %> 替换掉后 我要的结果是运行后的字符串
// 3. 拼接字符串拿到有用的结