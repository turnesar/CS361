CREATE TABLE `users` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`username` varchar(30) NOT NULL,
`email` varchar(40) NOT NULL,
`password` varchar(30) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `username` (	`username` )
) ENGINE = InnoDB;