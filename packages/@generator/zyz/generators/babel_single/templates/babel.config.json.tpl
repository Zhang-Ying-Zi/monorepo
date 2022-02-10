{
  "plugins": [
    "@babel/proposal-class-properties",
    "@babel/proposal-object-rest-spread"
  ],
  "presets": [
    [
      "@babel/env",
      {
        "targets": "> 0.25%, not dead",
        "useBuiltIns": "usage",
        "corejs": "3",
        "modules": "umd"
      }
    ]<%_ if(react || typescript) { -%>,<% } %>
    <%_ if(react) { -%>
    ["@babel/preset-react", {}]<% if(typescript) { %>,<% } %>
    <%_ } -%>
    <%_ if(typescript) { -%>
    ["@babel/preset-typescript", {}]
    <%_ } -%>
  ]
}
