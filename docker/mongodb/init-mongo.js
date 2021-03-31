db.createUser({
  user: 'root',
  pwd: '1qaz2wsx',
  roles: [
    {
      role: 'root',
      db: 'nestjs'
    }
  ]
  /**
   * All built-in Roles
   * Database User Roles: read|readWrite
   * Database Admin Roles: dbAdmin|dbOwner|userAdmin
   * Cluster Admin Roles: clusterAdmin|clusterManager|clusterMonitor|hostManager
   * Backup and Restoration Roles: backup|restore
   * All-Database Roles: readAnyDatabase|readWriteAnyDatabase|userAdminAnyDatabase|dbAdminAnyDatabase
   * Superuser Roles: root
   */
  // authenticationRestrictions: [ {
  //     clientSource: ["192.168.0.0"],
  //     serverAddress: ["xxx.xxx.xxx.xxx"]
  //  } ],

  //mechanisms: [ "<SCRAM-SHA-1|SCRAM-SHA-256>", ... ], 

  //passwordDigestor: "<server|client>"
})

