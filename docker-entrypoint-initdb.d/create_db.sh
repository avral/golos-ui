#!/bin/bash
mysql -u root -pgolosdev -e "GRANT ALL PRIVILEGES ON *.* TO 'golosdev'@'%'; FLUSH PRIVILEGES;"
