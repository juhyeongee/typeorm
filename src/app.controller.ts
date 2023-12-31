import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, UserModel } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ProfileModel } from './entity/profile.entitiy';
import { PostModel } from './entity/post.entity';
import { TagModel } from './entity/tag.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @InjectRepository(ProfileModel)
    private readonly profileRepository: Repository<ProfileModel>,
    @InjectRepository(PostModel) //
    private readonly postRepository: Repository<PostModel>,
    @InjectRepository(TagModel) //
    private readonly tagRepository: Repository<TagModel>,
  ) {}

  @Post('users')
  postUser(){
    return this.userRepository.save({})
  }

  @Get('users')
  getUsers() {
    return this.userRepository.find({
      relations: {
        profile: true,
        posts: true,
      }
    });
  }
  
  @Patch('users/:id')
  async patchUser(
    @Param('id') id: string
  ){
    const user = await this.userRepository.findOne({
      where: {
        id: parseInt(id), 
      }
    })

    return this.userRepository.save({
      ...user,
      // title: user.title + '0',
    })
  }

  @Post('user/profile')
  async createUserAndProfile(){
    const user = await this.userRepository.save({
      email: 'asdf@name.ai'
    })

    const profile = await this.profileRepository.save({
      profileImg: 'asdf.jpg',
      user,
    })
    return user;
  }

  @Post('user/post')
  async createUserAndPosts(){
    const user = await this.userRepository.save({
      email : 'post@gamil.com'
    });

    await this.postRepository.save({
      author: user,
      title: 'post 1',
    })
    await this.postRepository.save({
      author: user,
      title: 'post 2',
    })

    return user;
  }

  @Post('posts/tags')
  async createPostsTags(){
    const post = await this.postRepository.save({
        title: 'NestJS Lecture'
    }) 
    const post2 = await this.postRepository.save({
      title: 'Programming Lecture'
    })
    const tag1 =   await this.tagRepository.save({
      name: 'JS', 
    })
    const tag2 =   await this.tagRepository.save({
      name: 'TS', 
    })

    const post3 = await this.postRepository.save({
      title: 'NextJS Lecture', 
      tags : [tag1, tag2],
    })

      return true;
  }

  @Get('posts')
  getPosts(){
    return this.postRepository.find({
      relations: {
        tags: true,
      }
    })
  }

  @Get('tags')
  getTags(){
    return this.tagRepository.find({
      relations: {
        posts: true,
      }
    })
  }
}
 