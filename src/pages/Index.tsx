import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  stage?: string;
  subcategory?: 'materials' | 'labor';
  receipt?: string;
}

interface Comment {
  id: string;
  text: string;
  date: string;
  author: string;
}

interface Photo {
  id: string;
  url: string;
  date: string;
  description?: string;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  projects: string[];
  status: 'active' | 'inactive';
  joinDate: string;
  avatar?: string;
}

interface Stage {
  id: string;
  name: string;
  budget: number;
  spent: number;
  status: 'not-started' | 'in-progress' | 'completed';
  comments: Comment[];
  photos: Photo[];
}

interface Project {
  id: string;
  address: string;
  totalBudget: number;
  totalSpent: number;
  totalIncome: number;
  stages: Stage[];
  status: 'active' | 'completed' | 'archived';
  startDate: string;
  comments: Comment[];
  photos: Photo[];
}

const Index = () => {
  const [projects] = useState<Project[]>([
    {
      id: '1',
      address: 'ул. Ленина, 45',
      totalBudget: 5000000,
      totalSpent: 2350000,
      totalIncome: 1500000,
      status: 'active',
      startDate: '2024-01-15',
      comments: [
        { id: 'c1', text: 'Заказчик просит использовать немецкую сантехнику', date: '2024-11-10', author: 'Иванов И.' },
        { id: 'c2', text: 'Согласован выезд электрика на субботу', date: '2024-11-15', author: 'Петров П.' }
      ],
      photos: [
        { id: 'p1', url: '/placeholder.svg', date: '2024-11-01', description: 'Общий вид объекта' }
      ],
      stages: [
        { 
          id: 's1', 
          name: 'Демонтаж', 
          budget: 200000, 
          spent: 180000, 
          status: 'completed',
          comments: [
            { id: 'sc1', text: 'Работы завершены в срок', date: '2024-10-20', author: 'Сидоров С.' }
          ],
          photos: [
            { id: 'sp1', url: '/placeholder.svg', date: '2024-10-20', description: 'Демонтаж завершен' }
          ]
        },
        { 
          id: 's2', 
          name: 'Электрика', 
          budget: 800000, 
          spent: 650000, 
          status: 'in-progress',
          comments: [],
          photos: []
        },
        { 
          id: 's3', 
          name: 'Сантехника', 
          budget: 600000, 
          spent: 420000, 
          status: 'in-progress',
          comments: [],
          photos: []
        },
        { 
          id: 's4', 
          name: 'Отделка', 
          budget: 1500000, 
          spent: 0, 
          status: 'not-started',
          comments: [],
          photos: []
        },
      ]
    },
    {
      id: '2',
      address: 'пр. Победы, 12',
      totalBudget: 3500000,
      totalSpent: 1200000,
      totalIncome: 800000,
      status: 'active',
      startDate: '2024-02-20',
      comments: [],
      photos: [],
      stages: [
        { 
          id: 's5', 
          name: 'Фундамент', 
          budget: 1000000, 
          spent: 950000, 
          status: 'completed',
          comments: [],
          photos: []
        },
        { 
          id: 's6', 
          name: 'Стены', 
          budget: 1500000, 
          spent: 250000, 
          status: 'in-progress',
          comments: [],
          photos: []
        },
      ]
    },
    {
      id: '3',
      address: 'ул. Садовая, 78',
      totalBudget: 2800000,
      totalSpent: 2750000,
      totalIncome: 2800000,
      status: 'completed',
      startDate: '2023-09-10',
      comments: [],
      photos: [],
      stages: [
        { 
          id: 's7', 
          name: 'Ремонт фасада', 
          budget: 1500000, 
          spent: 1480000, 
          status: 'completed',
          comments: [],
          photos: []
        },
        { 
          id: 's8', 
          name: 'Кровля', 
          budget: 1300000, 
          spent: 1270000, 
          status: 'completed',
          comments: [],
          photos: []
        },
      ]
    }
  ]);

  const [transactions] = useState<Transaction[]>([
    { id: 't1', type: 'expense', amount: 45000, category: 'Материалы', description: 'Кабель ВВГ 3x2.5', date: '2024-11-20', stage: 'Электрика', subcategory: 'materials', receipt: '/placeholder.svg' },
    { id: 't2', type: 'expense', amount: 120000, category: 'Работы', description: 'Монтаж электропроводки', date: '2024-11-18', stage: 'Электрика', subcategory: 'labor' },
    { id: 't3', type: 'income', amount: 500000, category: 'Аванс', description: 'Предоплата от заказчика', date: '2024-11-15' },
    { id: 't4', type: 'expense', amount: 85000, category: 'Материалы', description: 'Трубы металлопластик', date: '2024-11-12', stage: 'Сантехника', subcategory: 'materials' },
  ]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 'e1',
      name: 'Иванов Иван',
      role: 'Прораб',
      email: 'ivanov@example.com',
      phone: '+7 (999) 123-45-67',
      projects: ['1'],
      status: 'active',
      joinDate: '2024-01-15',
      avatar: '👷'
    },
    {
      id: 'e2',
      name: 'Петров Петр',
      role: 'Электрик',
      email: 'petrov@example.com',
      phone: '+7 (999) 234-56-78',
      projects: ['1'],
      status: 'active',
      joinDate: '2024-03-20',
      avatar: '⚡'
    },
    {
      id: 'e3',
      name: 'Сидоров Сергей',
      role: 'Сантехник',
      email: 'sidorov@example.com',
      phone: '+7 (999) 345-67-89',
      projects: ['1', '2'],
      status: 'active',
      joinDate: '2024-02-10',
      avatar: '🔧'
    },
  ]);

  const totalBudget = projects.reduce((sum, p) => sum + p.totalBudget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.totalSpent, 0);
  const totalIncome = projects.reduce((sum, p) => sum + p.totalIncome, 0);
  const activeProjects = projects.filter(p => p.status === 'active').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success text-success-foreground';
      case 'in-progress': return 'bg-warning text-warning-foreground';
      case 'not-started': return 'bg-muted text-muted-foreground';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершен';
      case 'in-progress': return 'В работе';
      case 'not-started': return 'Не начат';
      case 'active': return 'Активный';
      case 'archived': return 'Архив';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="HardHat" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">СтройКонтроль</h1>
                <p className="text-sm text-muted-foreground">Управление объектами</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Отчёт
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setActiveTab('profile')}>
                <Icon name="User" size={16} className="mr-2" />
                Профиль
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                <Icon name="Plus" size={16} className="mr-2" />
                Новый объект
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-3xl grid-cols-6 mx-auto">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              Дашборд
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <Icon name="Building2" size={16} />
              Объекты
            </TabsTrigger>
            <TabsTrigger value="finance" className="gap-2">
              <Icon name="Wallet" size={16} />
              Финансы
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <Icon name="FileBarChart" size={16} />
              Отчеты
            </TabsTrigger>
            <TabsTrigger value="employees" className="gap-2">
              <Icon name="Users" size={16} />
              Сотрудники
            </TabsTrigger>
            <TabsTrigger value="profile" className="gap-2">
              <Icon name="User" size={16} />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 animate-fade-in">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="hover-scale border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <CardDescription>Общий бюджет</CardDescription>
                  <CardTitle className="text-3xl font-bold">{(totalBudget / 1000000).toFixed(1)}М ₽</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="TrendingUp" size={16} className="text-success" />
                    <span>Все объекты</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale border-l-4 border-l-destructive">
                <CardHeader className="pb-2">
                  <CardDescription>Потрачено</CardDescription>
                  <CardTitle className="text-3xl font-bold">{(totalSpent / 1000000).toFixed(1)}М ₽</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="TrendingDown" size={16} className="text-destructive" />
                    <span>{((totalSpent / totalBudget) * 100).toFixed(0)}% от бюджета</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale border-l-4 border-l-success">
                <CardHeader className="pb-2">
                  <CardDescription>Получено</CardDescription>
                  <CardTitle className="text-3xl font-bold">{(totalIncome / 1000000).toFixed(1)}М ₽</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Wallet" size={16} className="text-success" />
                    <span>Приходы</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover-scale border-l-4 border-l-secondary">
                <CardHeader className="pb-2">
                  <CardDescription>Активных объектов</CardDescription>
                  <CardTitle className="text-3xl font-bold">{activeProjects}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Building2" size={16} className="text-secondary" />
                    <span>В работе</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Building2" size={20} className="text-primary" />
                    Активные объекты
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {projects.filter(p => p.status === 'active').map((project) => (
                    <div key={project.id} className="p-4 rounded-lg border bg-card hover:shadow-lg transition-all cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg">{project.address}</h3>
                          <p className="text-sm text-muted-foreground">Начало: {new Date(project.startDate).toLocaleDateString('ru')}</p>
                        </div>
                        <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Бюджет</span>
                          <span className="font-semibold">{(project.totalBudget / 1000).toFixed(0)}K ₽</span>
                        </div>
                        <Progress value={(project.totalSpent / project.totalBudget) * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Использовано: {((project.totalSpent / project.totalBudget) * 100).toFixed(0)}%</span>
                          <span>{(project.totalSpent / 1000).toFixed(0)}K ₽</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="animate-scale-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Receipt" size={20} className="text-accent" />
                    Последние транзакции
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border bg-card hover:shadow-md transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'income' ? 'bg-success/10' : 'bg-destructive/10'
                        }`}>
                          <Icon 
                            name={transaction.type === 'income' ? 'ArrowDownToLine' : 'ArrowUpFromLine'} 
                            size={18} 
                            className={transaction.type === 'income' ? 'text-success' : 'text-destructive'}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{transaction.category}</span>
                            {transaction.stage && (
                              <>
                                <span>•</span>
                                <span>{transaction.stage}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${
                          transaction.type === 'income' ? 'text-success' : 'text-destructive'
                        }`}>
                          {transaction.type === 'income' ? '+' : '-'}{(transaction.amount / 1000).toFixed(0)}K ₽
                        </p>
                        <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString('ru')}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Все объекты</CardTitle>
                    <CardDescription>Управление строительными объектами</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary to-secondary">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить объект
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Новый объект</DialogTitle>
                        <DialogDescription>Создайте новый строительный объект</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="address">Адрес объекта</Label>
                          <Input id="address" placeholder="ул. Примерная, 1" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="budget">Общий бюджет</Label>
                          <Input id="budget" type="number" placeholder="5000000" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="start-date">Дата начала</Label>
                          <Input id="start-date" type="date" />
                        </div>
                      </div>
                      <Button className="w-full">Создать объект</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.filter(p => p.status !== 'archived').map((project) => (
                    <Card key={project.id} className="hover:shadow-lg transition-all cursor-pointer animate-scale-in">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
                              <Icon name="Building2" size={24} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{project.address}</h3>
                              <p className="text-sm text-muted-foreground">Начало: {new Date(project.startDate).toLocaleDateString('ru')}</p>
                            </div>
                          </div>
                          <Badge className={getStatusColor(project.status)}>{getStatusText(project.status)}</Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Бюджет</p>
                            <p className="text-lg font-bold">{(project.totalBudget / 1000000).toFixed(1)}М ₽</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Потрачено</p>
                            <p className="text-lg font-bold text-destructive">{(project.totalSpent / 1000000).toFixed(1)}М ₽</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Получено</p>
                            <p className="text-lg font-bold text-success">{(project.totalIncome / 1000000).toFixed(1)}М ₽</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold">Этапы работ</h4>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Icon name="Plus" size={14} className="mr-1" />
                                  Добавить этап
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Новый этап работ</DialogTitle>
                                  <DialogDescription>Добавьте этап для объекта {project.address}</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                  <div className="grid gap-2">
                                    <Label htmlFor="stage-name">Название этапа</Label>
                                    <Input id="stage-name" placeholder="Например: Отделка стен" />
                                  </div>
                                  <div className="grid gap-2">
                                    <Label htmlFor="stage-budget">Бюджет этапа</Label>
                                    <Input id="stage-budget" type="number" placeholder="500000" />
                                  </div>
                                </div>
                                <Button className="w-full">Добавить этап</Button>
                              </DialogContent>
                            </Dialog>
                          </div>
                          
                          <div className="space-y-2">
                            {project.stages.map((stage) => (
                              <div key={stage.id} className="p-3 rounded-lg border bg-muted/30">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <h5 className="font-medium">{stage.name}</h5>
                                    <Badge variant="outline" className={getStatusColor(stage.status)}>
                                      {getStatusText(stage.status)}
                                    </Badge>
                                    {stage.comments.length > 0 && (
                                      <Badge variant="secondary" className="text-xs">
                                        <Icon name="MessageSquare" size={12} className="mr-1" />
                                        {stage.comments.length}
                                      </Badge>
                                    )}
                                    {stage.photos.length > 0 && (
                                      <Badge variant="secondary" className="text-xs">
                                        <Icon name="Camera" size={12} className="mr-1" />
                                        {stage.photos.length}
                                      </Badge>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold">{(stage.budget / 1000).toFixed(0)}K ₽</span>
                                    <Dialog>
                                      <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                                          <Icon name="MessageSquarePlus" size={14} />
                                        </Button>
                                      </DialogTrigger>
                                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                          <DialogTitle>Этап: {stage.name}</DialogTitle>
                                          <DialogDescription>Комментарии и фото работ</DialogDescription>
                                        </DialogHeader>
                                        
                                        <div className="space-y-6 py-4">
                                          <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                              <h4 className="font-semibold flex items-center gap-2">
                                                <Icon name="MessageSquare" size={16} />
                                                Комментарии
                                              </h4>
                                            </div>
                                            
                                            <div className="space-y-2">
                                              {stage.comments.map((comment) => (
                                                <div key={comment.id} className="p-3 rounded-lg bg-muted/50 border">
                                                  <div className="flex items-start justify-between mb-1">
                                                    <span className="font-medium text-sm">{comment.author}</span>
                                                    <span className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString('ru')}</span>
                                                  </div>
                                                  <p className="text-sm">{comment.text}</p>
                                                </div>
                                              ))}
                                              {stage.comments.length === 0 && (
                                                <p className="text-sm text-muted-foreground text-center py-4">Комментариев пока нет</p>
                                              )}
                                            </div>

                                            <div className="space-y-2">
                                              <Label htmlFor={`stage-comment-${stage.id}`}>Добавить комментарий</Label>
                                              <Textarea id={`stage-comment-${stage.id}`} placeholder="Ваш комментарий..." />
                                              <Button size="sm" className="w-full">
                                                <Icon name="Send" size={14} className="mr-2" />
                                                Добавить комментарий
                                              </Button>
                                            </div>
                                          </div>

                                          <div className="border-t pt-4 space-y-3">
                                            <div className="flex items-center justify-between">
                                              <h4 className="font-semibold flex items-center gap-2">
                                                <Icon name="Camera" size={16} />
                                                Фото работ
                                              </h4>
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-3">
                                              {stage.photos.map((photo) => (
                                                <div key={photo.id} className="relative group rounded-lg overflow-hidden border">
                                                  <img src={photo.url} alt={photo.description} className="w-full h-40 object-cover" />
                                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                                    <div className="text-white text-xs">
                                                      <p className="font-medium">{photo.description}</p>
                                                      <p className="text-white/70">{new Date(photo.date).toLocaleDateString('ru')}</p>
                                                    </div>
                                                  </div>
                                                </div>
                                              ))}
                                              {stage.photos.length === 0 && (
                                                <div className="col-span-2 text-center py-8 text-muted-foreground">
                                                  <Icon name="Image" size={32} className="mx-auto mb-2 opacity-50" />
                                                  <p className="text-sm">Фото пока не загружены</p>
                                                </div>
                                              )}
                                            </div>

                                            <div className="space-y-2">
                                              <Label htmlFor={`stage-photo-${stage.id}`}>Загрузить фото</Label>
                                              <Input id={`stage-photo-${stage.id}`} type="file" accept="image/*" multiple />
                                              <Input placeholder="Описание фото (опционально)" />
                                              <Button size="sm" className="w-full">
                                                <Icon name="Upload" size={14} className="mr-2" />
                                                Загрузить фото
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </DialogContent>
                                    </Dialog>
                                  </div>
                                </div>
                                <Progress value={(stage.spent / stage.budget) * 100} className="h-1.5" />
                                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                  <span>Потрачено: {(stage.spent / 1000).toFixed(0)}K ₽</span>
                                  <span>{((stage.spent / stage.budget) * 100).toFixed(0)}%</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {(project.comments.length > 0 || project.photos.length > 0) && (
                          <div className="mt-4 pt-4 border-t space-y-3">
                            {project.comments.length > 0 && (
                              <div className="space-y-2">
                                <h5 className="text-sm font-semibold flex items-center gap-2">
                                  <Icon name="MessageSquare" size={14} />
                                  Комментарии по объекту
                                </h5>
                                {project.comments.slice(0, 2).map((comment) => (
                                  <div key={comment.id} className="p-2 rounded bg-muted/50 text-sm">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium text-xs">{comment.author}</span>
                                      <span className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString('ru')}</span>
                                    </div>
                                    <p className="text-xs">{comment.text}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            {project.photos.length > 0 && (
                              <div className="space-y-2">
                                <h5 className="text-sm font-semibold flex items-center gap-2">
                                  <Icon name="Camera" size={14} />
                                  Фото объекта
                                </h5>
                                <div className="flex gap-2 overflow-x-auto">
                                  {project.photos.slice(0, 4).map((photo) => (
                                    <img key={photo.id} src={photo.url} alt={photo.description} className="w-20 h-20 rounded object-cover" />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="flex gap-2 mt-4 pt-4 border-t">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="flex-1">
                                <Icon name="MessageSquarePlus" size={14} className="mr-1" />
                                Комментарии
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{project.address}</DialogTitle>
                                <DialogDescription>Комментарии и фото объекта</DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-6 py-4">
                                <div className="space-y-3">
                                  <h4 className="font-semibold flex items-center gap-2">
                                    <Icon name="MessageSquare" size={16} />
                                    Комментарии по объекту
                                  </h4>
                                  
                                  <div className="space-y-2">
                                    {project.comments.map((comment) => (
                                      <div key={comment.id} className="p-3 rounded-lg bg-muted/50 border">
                                        <div className="flex items-start justify-between mb-1">
                                          <span className="font-medium text-sm">{comment.author}</span>
                                          <span className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString('ru')}</span>
                                        </div>
                                        <p className="text-sm">{comment.text}</p>
                                      </div>
                                    ))}
                                    {project.comments.length === 0 && (
                                      <p className="text-sm text-muted-foreground text-center py-4">Комментариев пока нет</p>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor={`project-comment-${project.id}`}>Добавить комментарий</Label>
                                    <Textarea id={`project-comment-${project.id}`} placeholder="Комментарий по объекту..." />
                                    <Button size="sm" className="w-full">
                                      <Icon name="Send" size={14} className="mr-2" />
                                      Добавить комментарий
                                    </Button>
                                  </div>
                                </div>

                                <div className="border-t pt-4 space-y-3">
                                  <h4 className="font-semibold flex items-center gap-2">
                                    <Icon name="Camera" size={16} />
                                    Фото объекта
                                  </h4>
                                  
                                  <div className="grid grid-cols-3 gap-3">
                                    {project.photos.map((photo) => (
                                      <div key={photo.id} className="relative group rounded-lg overflow-hidden border">
                                        <img src={photo.url} alt={photo.description} className="w-full h-32 object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                          <div className="text-white text-xs">
                                            <p className="font-medium">{photo.description}</p>
                                            <p className="text-white/70">{new Date(photo.date).toLocaleDateString('ru')}</p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                    {project.photos.length === 0 && (
                                      <div className="col-span-3 text-center py-8 text-muted-foreground">
                                        <Icon name="Image" size={32} className="mx-auto mb-2 opacity-50" />
                                        <p className="text-sm">Фото объекта пока не загружены</p>
                                      </div>
                                    )}
                                  </div>

                                  <div className="space-y-2">
                                    <Label htmlFor={`project-photo-${project.id}`}>Загрузить фото объекта</Label>
                                    <Input id={`project-photo-${project.id}`} type="file" accept="image/*" multiple />
                                    <Input placeholder="Описание фото (опционально)" />
                                    <Button size="sm" className="w-full">
                                      <Icon name="Upload" size={14} className="mr-2" />
                                      Загрузить фото
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Icon name="FileText" size={14} className="mr-1" />
                            Отчёт
                          </Button>
                          <Button variant="outline" size="sm">
                            <Icon name="Archive" size={14} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="finance" className="space-y-6 animate-fade-in">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-l-4 border-l-success">
                <CardHeader>
                  <CardDescription>Приходы</CardDescription>
                  <CardTitle className="text-2xl">{(totalIncome / 1000000).toFixed(2)}М ₽</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-l-4 border-l-destructive">
                <CardHeader>
                  <CardDescription>Расходы</CardDescription>
                  <CardTitle className="text-2xl">{(totalSpent / 1000000).toFixed(2)}М ₽</CardTitle>
                </CardHeader>
              </Card>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardDescription>Баланс</CardDescription>
                  <CardTitle className="text-2xl">{((totalIncome - totalSpent) / 1000000).toFixed(2)}М ₽</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Финансовые операции</CardTitle>
                    <CardDescription>История приходов и расходов</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary to-secondary">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить операцию
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Новая финансовая операция</DialogTitle>
                        <DialogDescription>Добавьте приход или расход</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="type">Тип операции</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите тип" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="income">Приход</SelectItem>
                                <SelectItem value="expense">Расход</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="amount">Сумма</Label>
                            <Input id="amount" type="number" placeholder="50000" />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="project">Объект</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите объект" />
                            </SelectTrigger>
                            <SelectContent>
                              {projects.map(p => (
                                <SelectItem key={p.id} value={p.id}>{p.address}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="stage">Этап работ</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите этап" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="demo">Демонтаж</SelectItem>
                              <SelectItem value="electric">Электрика</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="subcategory">Категория расхода</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите категорию" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="materials">Материалы</SelectItem>
                              <SelectItem value="labor">Работы</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="description">Описание</Label>
                          <Textarea id="description" placeholder="Кабель, трубы, работа мастера..." />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="receipt">Фото чека</Label>
                          <Input id="receipt" type="file" accept="image/*" />
                        </div>
                      </div>
                      <Button className="w-full">Добавить операцию</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-md transition-all">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === 'income' ? 'bg-success/10' : 'bg-destructive/10'
                        }`}>
                          <Icon 
                            name={transaction.type === 'income' ? 'ArrowDownToLine' : 'ArrowUpFromLine'} 
                            size={20} 
                            className={transaction.type === 'income' ? 'text-success' : 'text-destructive'}
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{transaction.category}</span>
                            {transaction.stage && (
                              <>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">{transaction.stage}</Badge>
                              </>
                            )}
                            {transaction.subcategory && (
                              <>
                                <span>•</span>
                                <Badge variant="secondary" className="text-xs">
                                  {transaction.subcategory === 'materials' ? 'Материалы' : 'Работы'}
                                </Badge>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {transaction.receipt && (
                          <Button variant="ghost" size="sm">
                            <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                          </Button>
                        )}
                        <div className="text-right">
                          <p className={`text-lg font-bold ${
                            transaction.type === 'income' ? 'text-success' : 'text-destructive'
                          }`}>
                            {transaction.type === 'income' ? '+' : '-'}{(transaction.amount / 1000).toFixed(0)}K ₽
                          </p>
                          <p className="text-xs text-muted-foreground">{new Date(transaction.date).toLocaleDateString('ru')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Отчеты по объектам</CardTitle>
                <CardDescription>Аналитика и статистика</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="FileBarChart" size={48} className="mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Формирование отчетов в разработке</p>
                  <p className="text-sm">Скоро здесь появятся подробные отчеты по всем объектам</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Сотрудники</CardTitle>
                    <CardDescription>Управление командой</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-primary to-secondary">
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        Добавить сотрудника
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Новый сотрудник</DialogTitle>
                        <DialogDescription>Добавьте сотрудника в команду</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="emp-name">ФИО</Label>
                            <Input id="emp-name" placeholder="Иванов Иван Иванович" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="emp-role">Должность</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите должность" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="manager">Прораб</SelectItem>
                                <SelectItem value="electrician">Электрик</SelectItem>
                                <SelectItem value="plumber">Сантехник</SelectItem>
                                <SelectItem value="builder">Строитель</SelectItem>
                                <SelectItem value="finisher">Отделочник</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="emp-email">Email</Label>
                            <Input id="emp-email" type="email" placeholder="email@example.com" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="emp-phone">Телефон</Label>
                            <Input id="emp-phone" placeholder="+7 (999) 123-45-67" />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="emp-projects">Назначить на объекты</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Выберите объекты" />
                            </SelectTrigger>
                            <SelectContent>
                              {projects.map((project) => (
                                <SelectItem key={project.id} value={project.id}>
                                  {project.address}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <Button className="w-full">Добавить сотрудника</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {employees.map((employee) => (
                    <Card key={employee.id} className="hover:shadow-lg transition-all animate-scale-in">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-3xl">
                            {employee.avatar}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{employee.name}</h3>
                            <p className="text-sm text-muted-foreground">{employee.role}</p>
                            <Badge className={employee.status === 'active' ? 'bg-success mt-2' : 'bg-muted mt-2'}>
                              {employee.status === 'active' ? 'Активен' : 'Неактивен'}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Icon name="Mail" size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">{employee.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Phone" size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">{employee.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Calendar" size={14} className="text-muted-foreground" />
                            <span className="text-muted-foreground">
                              С {new Date(employee.joinDate).toLocaleDateString('ru')}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-semibold">Объекты</span>
                            <Badge variant="outline">{employee.projects.length}</Badge>
                          </div>
                          <div className="space-y-1">
                            {employee.projects.map((projectId) => {
                              const project = projects.find(p => p.id === projectId);
                              return project ? (
                                <div key={projectId} className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Icon name="Building2" size={12} />
                                  {project.address}
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Icon name="Edit" size={14} className="mr-1" />
                            Изменить
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Icon name="Trash2" size={14} className="mr-1" />
                            Удалить
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6 animate-fade-in">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Профиль</CardTitle>
                  <CardDescription>Личная информация</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-6xl">
                      👨‍💼
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold">Александр Петров</h3>
                      <p className="text-sm text-muted-foreground">Руководитель</p>
                      <Badge className="mt-2 bg-success">Администратор</Badge>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <Icon name="Mail" size={18} className="text-muted-foreground" />
                      <span className="text-sm">petrov@stroykontrol.ru</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Phone" size={18} className="text-muted-foreground" />
                      <span className="text-sm">+7 (999) 000-11-22</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="MapPin" size={18} className="text-muted-foreground" />
                      <span className="text-sm">г. Москва</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Calendar" size={18} className="text-muted-foreground" />
                      <span className="text-sm">В компании с 2020 года</span>
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Редактировать профиль
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Статистика</CardTitle>
                  <CardDescription>Ваша активность в системе</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <Icon name="Building2" size={24} className="text-primary" />
                        <Badge>{projects.length}</Badge>
                      </div>
                      <p className="text-2xl font-bold">{projects.filter(p => p.status === 'active').length}</p>
                      <p className="text-sm text-muted-foreground">Активных объектов</p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <Icon name="Users" size={24} className="text-success" />
                        <Badge>{employees.length}</Badge>
                      </div>
                      <p className="text-2xl font-bold">{employees.filter(e => e.status === 'active').length}</p>
                      <p className="text-sm text-muted-foreground">Активных сотрудников</p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <Icon name="Wallet" size={24} className="text-warning" />
                      </div>
                      <p className="text-2xl font-bold">{(totalBudget / 1000000).toFixed(1)}М</p>
                      <p className="text-sm text-muted-foreground">Общий бюджет</p>
                    </div>
                    <div className="p-4 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <Icon name="TrendingUp" size={24} className="text-destructive" />
                      </div>
                      <p className="text-2xl font-bold">{(totalSpent / 1000000).toFixed(1)}М</p>
                      <p className="text-sm text-muted-foreground">Израсходовано</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-4">Настройки аккаунта</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Icon name="Bell" size={18} className="text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">Уведомления</p>
                            <p className="text-xs text-muted-foreground">Получать оповещения о событиях</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Включено</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Icon name="Lock" size={18} className="text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">Безопасность</p>
                            <p className="text-xs text-muted-foreground">Изменить пароль</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Настроить</Button>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <Icon name="Download" size={18} className="text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">Экспорт данных</p>
                            <p className="text-xs text-muted-foreground">Скачать все данные</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Скачать</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;