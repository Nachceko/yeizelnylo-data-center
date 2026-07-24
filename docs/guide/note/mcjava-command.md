---
title: Minecraft Java 指令笔记
createTime: 2026/07/20 12:10:00
permalink: /guide/note/mcjava-command/
tags:
  - Minecraft Java
  - Minecraft Java Command
copyright:
  author:
    name: YeizelNylo
---
## 前言

:::warning
以下指令均来源于：[McMod网站](https://www.mcmod.cn/tools/cbcreator/#/home/)
:::

> 仅限于 ==Minecraft Java== 版本，网易版部分不可用。

## ==客户端指令==

|**给xxx64个屏障：**|/give @p minecraft:barrier 64 0|
--|--|
|**屏幕标题**|/title @a title [{"text":"文字","bold":false,"italic":false,"underlined":false,"strikethrough":false,"obfuscated":false}]|
|**清除玩家的物品**|/clear|
|**给与玩家命令方块**|/give 玩家名字 minecraft:command_block|
|**清除所有实体**|/kill @e |
|**设置重生点**|/spawnpoint|
|**保留物品栏指令即死亡不掉落指令:**|/gamerule keepInventory true|
|**关闭死亡不掉落:**|/gamerule keepInventory false。|
|**边境方块**|/give @s border_block|
|**生成鞘翅**|/give @p minecraft:elytra 1|
|**调试棒**|/give @p minecraft:debug_stick 1|
|**末影门**|/setblock ~ ~1 ~ minecraft:end_gateway{Age:200,ExitPortal:{X:0,Y:0,Z:0},ExactTeleport:1b} replace|
|**传送玩家到指定坐标**|/tp @p 100 100 100|
|**关闭玩家输段选入的指令消息**| /gamerule sendCommandFeedback false |
|**获得烟火**|/give @p minecraft:firework_rocket{Fireworks:{Explosions:[{Type:0,Colors:[I;0],FadeColors:[I;0]}]}} 64|
|**32k剑**|give @s minecraft:diamond_sword{Enchantments: [ {id:"sharpness",lvl:32767s}, {id:"looting",lvl:32767s}, {id:"sweeping",lvl:32767s}, {id:"unbreaking",lvl:32767s}, {id:"mending",lvl:32767s}]}|
||/give @p minecraft:structure_void 64 0|
||/give @p minecraft:structure_block 64 0|

---

### ==天气指令==

|下雨指令|/weather rain|
--|--|
|雷雨指令|/weather thunder|
|雨停的指令(清除所有天气指令)|/weather clear|

---

### ==时间指令==

时间指令前面都是：*/time set*，后面从早到晚分别是：

|**日出**|sunrise|
--|--|
|**白天**|day|
|**中午**|noon|
|**日落**|sunset|
|**夜晚**|night|
|**午夜**|midnight|

---

## ==服务端指令==

|**去掉管理员**|deop|
--|--|
|**给xxx加管理员**|op|
|**清空控制台**|clear|
|**关闭或者开启伤害**| 即无敌damage|
|**把自己移动到下面一个的平台**|descend|
|**破坏当前的东西（背包）**|destroy [all]|
|**把自己提升到上一个平台**|ascend|
|**设置一键命令**|bind命令 {命令关键字} |
|**拆弹（拆除已经点燃了的TNT炸药）**|defuse [all] |
||diff- X|
|**设置游戏难度**|difficulty|
|**在身边创建一个储物柜**|dropstore|
|**开关物品掉落，关闭的话采矿打怪不掉东西**|drops|
|**复制东西**|dupe [all] |
|**复制手上的东西并丢出来**|duplicate [all] |
|**设置一个地方爆炸（在自家慎用）**|explode [范围] |
|**熄灭周围所有的火**|extinguish [all] |
