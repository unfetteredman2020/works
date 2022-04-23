/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 50728
 Source Host           : localhost:3306
 Source Schema         : workServe

 Target Server Type    : MySQL
 Target Server Version : 50728
 File Encoding         : 65001

 Date: 23/04/2022 19:35:10
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Cases
-- ----------------------------
DROP TABLE IF EXISTS `Cases`;
CREATE TABLE `Cases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chapter_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '编ID',
  `chapter_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '章标题',
  `branchCompile_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分编标题',
  `compile_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '编标题',
  `compile_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '编ID',
  `branchCompile_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分编ID',
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户ID',
  `case_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'caseID',
  `author` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '作者',
  `comments` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '章内容',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for Chapters
-- ----------------------------
DROP TABLE IF EXISTS `Chapters`;
CREATE TABLE `Chapters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `chapter_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '编ID',
  `chapter_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '章标题',
  `compile_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '编ID',
  `branchCompile_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分编标题',
  `compile_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '编标题',
  `branchCompile_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分编ID',
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户ID',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for LawCases
-- ----------------------------
DROP TABLE IF EXISTS `LawCases`;
CREATE TABLE `LawCases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户ID',
  `lawCase_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'lawCaseID',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标题',
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '章内容',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for Users
-- ----------------------------
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'YpxW1ffLqwyzT9Ym3t3v2' COMMENT '用户ID',
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名称',
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '密码',
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户手机号',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '头像',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `destroyTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for article_labels
-- ----------------------------
DROP TABLE IF EXISTS `article_labels`;
CREATE TABLE `article_labels` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `label_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'D0MKixCQZ1NWbpZaCPqbn' COMMENT '标签ID',
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户ID',
  `label_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名称',
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '创建者',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `article_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章ID',
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户ID',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章标题',
  `author` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '作者',
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文章内容',
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '保存地址',
  `comments` longtext COLLATE utf8mb4_unicode_ci COMMENT '评论',
  `like_count` int(11) DEFAULT '0' COMMENT '点赞数量',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for branchCompiles
-- ----------------------------
DROP TABLE IF EXISTS `branchCompiles`;
CREATE TABLE `branchCompiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `compile_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '编ID',
  `compile_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '编标题',
  `branchCompile_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分编ID',
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户ID',
  `branchCompile_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '分编标题',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Table structure for compiles
-- ----------------------------
DROP TABLE IF EXISTS `compiles`;
CREATE TABLE `compiles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `compile_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '编ID',
  `user_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户ID',
  `text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '编标题',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
